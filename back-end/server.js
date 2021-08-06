const express = require('express')
const path = require('path')
const server = express();
const formidable = require('formidable');

server.use("/public",express.static(path.join(__dirname, "../front-end/public/")));

server.get('/', (req, res) => {
  res.sendFile(
      path.join(__dirname, '../front-end/index.html')
    );
});
  
server.post('/', (req, res, next) => {
  const form = formidable({ multiples: true, uploadDir: path.join(__dirname, '/upload') });
 
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    //res.json({ fields, files });

    const fileNames = files.userFile.map((file) =>  file.name)
    console.log(fileNames)
    res.json(fileNames)
    //const userFields = JSON.parse(fields.userJson);
    
  });
  
  //res.send("minden oke")
});

const port = 6789;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});