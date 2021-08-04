const express = require('express')
const path = require('path')
const server = express();

server.get('/', (req, res) => {
    res.sendFile( 
        path.join(__dirname, '../front-end/index.html')
    )
});

server.use("/public",express.static(path.join(__dirname, "../front-end/public/")));

server.post('/', (req, res) => {
    console.log(req.body)
    res.send("welcome")
  });


const port = 6789;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});