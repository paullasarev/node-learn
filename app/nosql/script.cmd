docker run --name some-mongo -d mongo --auth

docker ps 
# see NAMES sction
docker exec -it <name> mongo admin

docker run -it --rm --link some-mongo:mongo mongo mongo -u jsmith -p some-initial-password --authenticationDatabase admin some-mongo/some-db