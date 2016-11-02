#!/bin/bash
# Test the server API with some curl calls

set -e
echo "Writing testdata"
curl --header "Content-Type: application/json" http://localhost:1337/chirps \
 -d '{ "avatar": "https://robohash.org/1?size=52x52", "message": "I love ActionScript" }' 
curl --header "Content-Type: application/json" http://localhost:1337/chirps \
 -d '{ "avatar": "https://robohash.org/2?size=52x52", "message": "Endermen used to be people" }'
curl --header "Content-Type: application/json" http://localhost:1337/chirps \
 -d '{ "avatar": "https://robohash.org/3?size=52x52", "message": "dat chirp" }'
curl --header "Content-Type: application/json" http://localhost:1337/chirps \
 -d '{ "avatar": "https://robohash.org/4?size=52x52", "message": "We dont go to Ravenholm" }'


echo "reading set:"
curl http://localhost:1337/chirps

 echo ""
