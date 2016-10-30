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

server.get('/api/users', function (req, res) {
  userSet.read().then(users => {
    res.send(users);
  })
});

server.post('/api/cweeps', function (req, res) {
  var cweep = req.body;
  // add a timestamp for sorting
  cweep.time = Date.now();
  // store current user
  cweep.user = currentUser(req);

  return userSet.read().then(users => {
    // add new cweep to the timeline of all users
    let ops = users.map(u => timeline(u).add(cweep))
    return antidote.update(ops);
  }).then(() => {
    res.status(200).send(cweep);
  });
});

function getTimeline(user, res) {
  timeline(user).read().then(cweeps => {
    cweeps.sort((x, y) => y.time - x.time);
    res.send(cweeps);
  })
}

server.get('/api/timeline', function (req, res) {
  getTimeline(currentUser(req), res)
});

server.get('/api/timeline/:user', function (req, res) {
  let user = req.params.user;
  getTimeline(user, res)
});

// function to delete everything (for demos and debugging)
// e.g.: curl -d "" http://localhost:1337/api/clearCweeps
server.post('/api/clearCweeps', function (req, res) {
  function clearUser(u) {
    timeline(u).read().then(cweeps => {
      return antidote.update([
        userSet.remove(u),
        timeline(u).removeAll(cweeps)
      ]);
    })
  }


  return userSet.read().then(users => {
    return Promise.all(users.map(u => clearUser(u)))
  }).then(_ => {
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
  });
});

// ----- start server -----
http.createServer(server).listen(server.get('port'), function () {
  console.log("Express server listening on port " + server.get('port'));
});
