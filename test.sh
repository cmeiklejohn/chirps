#!/bin/bash
# Test the server API with some curl calls

set -e
echo "Writing testdata"
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://si0.twimg.com/profile_images/2536088319/4sl2go65was3o0km520j_reasonably_small.jpeg", "message": "I love ActionScript" }' 
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://si0.twimg.com/profile_images/2201732897/notch_weird.png", "message": "Endermen used to be people" }'
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://si0.twimg.com/profile_images/1968705093/avatar.jpg", "message": "dat cweep" }'
curl --header "Content-Type: application/json" http://localhost:1337/cweeps \
 -d '{ "avatar": "https://si0.twimg.com/profile_images/2536088319/4sl2go65was3o0km520j_reasonably_small.jpeg", "message": "We dont go to Ravenholm" }'


echo "reading set:"
curl http://localhost:1337/cweeps

 echo ""