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
* Add smtpConfig.json file from bellow containg credentials for connecting to SMTP server

### How to run Client? ###

* Navigate to client directory
* Run npm install
* Run npm start
* Log in to administrator panel with username: "Admin" and password: "admin"

```
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
```
```
server/config/smtpConfig.json
{
    "host": "",
    "port": ,
    "user": "", 
    "pass": ""
}
```