# README #

Root repository for StuDent project with frontend and api

### How do I get set up? ###

* Make sure you have Node v14.17.3+ installed and sequelize-cli (```npm install --save-dev sequelize-cli```)

### How to run the API? ###

* Navigate to server directory
* Run ```npm install```
* Add config.json file from bellow to config directory with local data
* Run ```npx sequelize-cli db:migrate```
* Run ```npx sequelize-cli db:seed:all```
* Run ```npm start``` 

### How to run Client? ###

* Navigate to client directory
* Run npm install
* Run npm start


server/config/config.json
{
    "development": {
    "username": "postgres",
    "password": "1234",
    "database": "student",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }, ...
}