# mốt số lệnh  docker 
docker-compose down  

docker-compose up   

docker-compose -f docker-compose.prod.yml up --build

docker build -f ./docker/Dockerfile.prod -t snag113/tip_management_nodejs_mogodb .

docker push snag113/tip_management_nodejs_mogodb

================================
# thao tác với db mongo

docker container stop mongo; 
docker run -e MONGO_INITDB_ROOT_USERNAME=snag -e MONGO_INITDB_ROOT_PASSWORD=712331 --name mongo -p 27017:27017 -v $HOME/mongo:/data/db --rm -d mongo --auth

[thực hiện cmd của mongo]
docker exec -it mongo sh -c 'exec mongo'

use admin
db.createUser({
  user: 'snag',
  pwd: '712331',
  roles: [{
    role: 'readWrite',
    db: 'tip_manament'
  }]
})
# console sau khi thao tác 
> use admin
switched to db admin
> db.createUser({
...   user: 'snag',
...   pwd: '712331',
...   roles: [{
...     role: 'readWrite',
...     db: 'tip_manament'
...   }]
... })
Successfully added user: {
        "user" : "snag",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "tip_manament"
                }
        ]
}

> 
1. show các database
show dbs
use tip_management

show collections
2. tạo collection
db.createCollection('categorymaster') 
db.createCollection('subcategory') 
db.createCollection('note') 

3. insert vào collections
db.categorymaster.insert({"id":1, "name": "first" })

db.categorymasters.find()
============================







===================================
# backup:

FROM node:12.16.2-alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]



-----------------------

version: '3.7'

services:
  node:
      container_name: node_server
      build:
        context: .
        dockerfile: ./docker/Dockerfile
      ports:
       - 3000:3000
      volumes:
        - .:/app
      command: yarn dev
      networks:
        - common
      environment:
        PORT: 3000
        MONGO_URL: mongodb://mongo/note_manament
        NODE_ENV: 'development'

  mongo:
    container_name: mongo
    image : mongo
    ports:
     - 27017:27017
    volumes:
    - ./data:/data/db
    networks:
    - common

networks:
  common:





https://www.thanhlongdev.com/huong-dan-cach-deploy-project-nodejs-len-heroku/
# Deploy to heroku


https://dashboard.heroku.com/apps/tipmanagementnodejs/deploy/github
sangpro1997@gmail.com
1. connect to github
2. exec manual deploy
3. command:
 show log : heroku logs --tail

# deploy mongoDb
https://cloud.mongodb.com/v2/622956953acad82cd2c02105#clusters/edit?filter=starter&fromPathSelector=true
sangpro1997@gmail.com

snag-712331

mongodb+srv://snag:712331@cluster0.gn0ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority