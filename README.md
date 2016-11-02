Chirps
================

Compile and execute:

```
    # install dependencies:
    npm install
    
    # transpile javascript:
    npm run compile
    
    # run server:
    npm start

    # compiles and reruns server on filesystem changes:
    npm run develop
```

## Structure:

* `server.js` contains the implementation of the server
    * Json API is available via `/api/...` routes.
    * Routes for the web application:
        * `/` is the home page.
        * `/timeline/:userName` shows the timeline of the given user.
* The `app` folder contains the javascript app.
    * `main.jsx` is the entry point.
    * `components/app.jsx` is where the client-side routes are defined.

## Other

The database state can be reset and initialized using a simple API call:

    curl -d "" http://localhost:1337/api/clearChirps
