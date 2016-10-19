#!/bin/bash
# Test the server API with some curl calls

set -e
echo "Writing testdata"
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://robohash.org/1", "message": "I love ActionScript" }' 
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://robohash.org/2", "message": "Endermen used to be people" }'
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://robohash.org/3", "message": "dat cweep" }'
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://robohash.org/4", "message": "We dont go to Ravenholm" }'


echo "reading set:"
curl http://localhost:1337/cweeps

 echo ""