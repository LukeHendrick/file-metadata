const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const app = express();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/', (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', (name, file) => {
    console.log(file);
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', (name, file) => {
    console.log('Uploaded ' + file.name);
    const stats = fs.statSync('./uploads/' + file.name)
    const fileSizeInBytes = stats.size;
    const sizeJSON = {"size": fileSizeInBytes};
    res.send(sizeJSON);
  });
})

port = process.env.PORT || 3000;

app.listen(port);
console.log(`Server is running on port ${port}`)
