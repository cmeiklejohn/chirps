"use strict"

let express = require('express');
let http = require('http');
let path = require('path');
let antidoteClient = require( 'antidote_ts_client');
let errorhandler = require('errorhandler');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let server = express();

let publicDir = path.join(__dirname, '../../public');

server.set('port', process.env.PORT || 1337);
server.use(morgan('combined')); // Logger
server.use(bodyParser.json());

server.use(express.static(publicDir));

if (process.env.NODE_ENV === 'development') {
  server.use(errorhandler());
}

// Antidote connection setup
let antidote = antidoteClient.connect(process.env.ANTIDOTE_PORT || 8087, process.env.ANTIDOTE_HOST || "localhost");
antidote.defaultBucket = "chirps";

//-----
// Database Schema:

// global set of all user ids
let userSet = antidote.set("users")

// each user has a timeline with the Chirps he can read
let timeline = (user) => antidote.set(`timeline_${user}`);

//---
// Demo setup:


// insert dummy user
antidote.update(userSet.add('Donald'))
  .then(_ => console.log(`Inserted dummy user`))
  .catch(err => console.log(`Could not insert dummy user `, err));

function currentUser(request) {
  // return fake user
  return 'Donald';
}


// ----- APP ----- //
server.get('/', function (req, res, next) {
  res.sendfile('public/index.html');
});

server.get(/^\/(timeline)\/.*/, function (req, res, next) {
  res.sendfile('public/index.html');
});


// API

// helper function for async handlers:
function handle(handler) {
  return (req, res, next) => {
    handler(req)
      .then(r => res.send(r))
      .catch(next)
  };
}

/**
 * Gives a list of all user-names in the system
 */
server.get('/api/users', handle(async req => {
  return await userSet.read();
}));

/**
 * Adds a new Chirp for the current user (see currentUser function).
 * 
 * Expects a Chirp in the following format:
 * {
 *   message: string;
 *   avatar: string;
 * }
 * 
 * The new Chirp will be saved to the timeline of every user in the system
 * 
 */
server.post('/api/chirps', handle(async req => {
  var chirp = req.body;
  // add a timestamp for sorting
  chirp.time = Date.now();
  // store current user
  chirp.user = currentUser(req);

  // get all users 
  let users = await userSet.read();
  // add new Chirp to the timeline of every user
  if (users.length == 0) {
    console.log("Warning: No users found to see the new chirp.")
  } else {
    await antidote.update(
      users.map(u => timeline(u).add(chirp))
    );
  }
  return chirp;
}));

/**
 * Fetches the timeline for a given user
 */
async function getTimeline(user) {
  let chirps = await timeline(user).read();
  chirps.sort((x, y) => y.time - x.time);
  return chirps;
}

/**
 * Gives the timeline for the current user
 */
server.get('/api/timeline', handle(async req => {
  return getTimeline(currentUser(req))
}));

/**
 * Gives the timeline for a specific user
 */
server.get('/api/timeline/:user', handle(async req => {
  let user = req.params.user;
  return getTimeline(user)
}));

// function to delete everything (for demos and debugging)
// e.g.: curl -d "" http://localhost:1337/api/clearChirps
server.post('/api/clearChirps', handle(async req => {
  async function clearUser(u) {
    let chirps = await timeline(u).read();
    return antidote.update([
      userSet.remove(u),
      timeline(u).removeAll(chirps)
    ]);
  }

  let users = await userSet.read(); 
  console.log(`Clearing users ${users}`);
  if (users.length > 0) {
      await Promise.all(users.map(u => clearUser(u)))
  }
  console.log(`Adding new users`);
  // add some users:
  await antidote.update(
    userSet.addAll([
      "Alice",
      "Bob",
      "Claudia",
      "Donald"
    ])
  );
  return "database cleared\n";
}));

// ----- start server -----
http.createServer(server).listen(server.get('port'), function () {
  console.log("Express server listening on port " + server.get('port'));
});
