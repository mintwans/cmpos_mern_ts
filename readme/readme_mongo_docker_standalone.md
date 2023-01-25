# mongo on docker hub

- https://hub.docker.com/_/mongo

# Run mongo on docker container (mac)

- cd to root workshop containing both frontend and backend folder

```yml
docker run --name mongo-dev \
-v $(pwd)/mongo-dev/db:/data/db \
-v $(pwd)/dummy_db_cmpos:/script \
-p 27018:27017 -d --rm mongo
```

# Run mongo on docker container (win)

```yml
docker run --name mongo-dev ^
-v "%cd%/mongo-dev/db":/data/db ^
-v "%cd%/dummy_db_cmpos":/script ^
-p 27018:27017 -d --rm mongo
```

# restore summary database

- mongorestore -d demopos /script/
- mongo -p 27018
