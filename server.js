var express = require('express'),
  http = require('http'),
  path = require('path'),
  antidoteClient = require('antidote_ts_client')
server = express();

server.configure(function () {
  server.set('port', process.env.PORT || 1337);
  server.use(express.favicon());
  server.use(express.logger('dev'));
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(server.router);
  server.use(express.static(path.join(__dirname, 'public')));
});

server.configure('development', function () {
  server.use(express.errorHandler());
});

// Antidote connection setup
let antidote = antidoteClient.connect(process.env.ANTIDOTE_PORT || 8087, process.env.ANTIDOTE_HOST || "localhost");
antidote.defaultBucket = "cweepy";

// used keys
let userSet = antidote.set("users")
let timeline = (user) => antidote.set(`timeline_${user}`);

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

server.get('/api/users', function (req, res, next) {
  userSet.read().then(users => {
    res.send(users);
  }).catch(next);
});

server.post('/api/cweeps', function (req, res, next) {
  var cweep = req.body;
  // add a timestamp for sorting
  cweep.time = Date.now();
  // store current user
  cweep.user = currentUser(req);

  return userSet.read().then(users => {
    // add new cweep to the timeline of all users
    let ops = users.map(u => timeline(u).add(cweep))
    if (ops.length > 0) {
      return antidote.update(ops);
    } else {
      console.log("Warning: No users found to see the new cweep.")
    }
  }).then(_ => {
    res.status(200).send(cweep);
  }).catch(next);
});

function getTimeline(user, res, next) {
  timeline(user).read().then(cweeps => {
    cweeps.sort((x, y) => y.time - x.time);
    res.send(cweeps);
  }).catch(next);
}

server.get('/api/timeline', function (req, res, next) {
  getTimeline(currentUser(req), res, next)
});

server.get('/api/timeline/:user', function (req, res, next) {
  let user = req.params.user;
  getTimeline(user, res, next)
});

// function to delete everything (for demos and debugging)
// e.g.: curl -d "" http://localhost:1337/api/clearCweeps
server.post('/api/clearCweeps', function (req, res, next) {
  function clearUser(u) {
    return timeline(u).read().then(cweeps => {
      return antidote.update([
        userSet.remove(u),
        timeline(u).removeAll(cweeps)
      ]);
    })
  }


  return userSet.read().then(users => {
    console.log(`Clearing users ${users}`);
    if (users.length > 0) {
      return Promise.all(users.map(u => clearUser(u)))
    }
  }).then(_ => {
    console.log(`Adding new users`);
    // add some users:
    return antidote.update(
      userSet.addAll([
        "Alice",
        "Bob",
        "Claudia",
        "Donald"
      ])
    );
  }).then(() => {
    res.status(200).send("database cleared\n");
  }).catch(next);
});

// ----- start server -----
http.createServer(server).listen(server.get('port'), function () {
  console.log("Express server listening on port " + server.get('port'));
});
