const express = require('express')
const path = require('path')
const server = express();
//const bodyParser = require('body-parser');
let multer  = require('multer');
const { runInNewContext } = require('vm');

let upload  = multer({ storage: multer.memoryStorage() });

// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));


server.get('/', (req, res) => {
  res.sendFile( 
    path.join(__dirname, '../front-end/index.html')
    )
  });
  
  server.use("/public",express.static(path.join(__dirname, "../front-end/public/")));
  
  // server.use(function (req, res, next) {
  //   req.headers['content-type'] = 'application/json';
  //   next();
  // });
  // use the above to change the request header for incoming post requests
  
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }))

// server.post('/', (req, res) => {
//   //req.header("Content-Type", "application/json")
//   console.log('body: ', req.body);
//   console.log(req.body.firstname)
// })

server.post('/', upload.none(), (req, res) => {
  //parse the json received in the body and console log the received information
  // pay special attention to: 
  // req.on('data', (data) => {
  //   console.log(data.toString());
  // });
    console.log(req.body);
    res.send("welcome")
  });


const port = 6789;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});