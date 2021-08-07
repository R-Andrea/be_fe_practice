const express = require('express')
const path = require('path')
const server = express();
const formidable = require('formidable');
const { FILE } = require('dns');

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
    let fileNames;
    if (files.userFile.length >1 ) {

      fileNames = files.userFile.map((file) =>  file.name)
    } else {
      fileNames = files.userFile.name
    }
    console.log(fileNames)
    res.json(fileNames)
    //const userFields = JSON.parse(fields.userJson);
    
  });
  
});

const port = 6789;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});