const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const app = express();

var corsOptions = {
  origin: "http://localhost:8001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to stuDent." });
});

require('./routes/adminRoutes')(app);
require('./routes/newsRoutes')(app);
require('./routes/scheduleRoutes')(app);
require('./routes/patientRoutes')(app);
require('./routes/requestRoutes')(app);
require('./routes/galleryRoutes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
