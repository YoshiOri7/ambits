// =====================================================
// docker hub
// https://docs.docker.com/engine/getstarted/step_six/

// mongo
docker run -d --name mongodb -p 27017:27017 mongo

// ambit server and database
docker build -t ambit:server .
docker tag c75255d644c9 yoshiori/ambit:ambitserver
docker push yoshiori/ambit:ambitserver

// Pull your new image
docker pull yoshiori/ambit:ambitserver

// linking containers
docker run -d --name database -p 27017:27017 0dffc7177b06
docker run -d -P --name ambitserver --link database:database -p 5000:5000 c75255d644c9
docker exec -ti ff8a801e3165 /bin/bash


yoshiori/ambit