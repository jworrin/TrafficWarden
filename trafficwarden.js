const express = require("express")
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(express.static('static'));



// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// default route
/*app.get("/", (req, res) => {
    /*request('http://localhost:3001', function(error, response, body) {
    if(!error && response.statusCode === 200) {
      //console.log(body);
      res.send(body);
    }
  });
}); */


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
}); 

// route to the USPS app with no trailing slash
app.get("/charts", (req, res) => {
    let tempPath = '/'; 
    request('http://localhost:3432' + tempPath, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});




// route to the USPS app with a trailing slash
app.get("/charts/*", (req, res) => {
    let tempPath = req.path.substr(7); 
    console.log('http://localhost:3432' + tempPath);
    request('http://localhost:3432' + tempPath, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      console.log(body);
      res.send(body);
    }
  });
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
