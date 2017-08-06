var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var fileName = __dirname + '/../client/public/numbers.json'
var file = require(fileName);

app.use(bodyParser.json())

app.get('/api/numbers', function (req, res) {
  fs.readFile(fileName, 'utf8', function (err, data) {
    console.log(err, data)
    if (err || data == '' || !JSON.parse(data).numbers || JSON.parse(data).numbers.length == 0) {
      res.json({
        success: false,
        data: '',
        info: 'No hay datos guardados'
      })
    } else {
      res.json({
        success: true,
        data: JSON.parse(data),
        info: 'Datos cargados'
      })
    }
  });
});

app.post('/api/numbers', function (req, res) {
  if (!file.numbers) {
    file.numbers = [];
  }
  file.numbers.push(req.body)
  fs.writeFile(fileName, JSON.stringify(file), function (err) {
    if (err) {
      console.log('Error al crear archivo');
    } else {
      res.json({
        success: true,
        data: 'Datos guardados',
        info: ''
      });
    }
  })
});

app.get('/app/*', function (req, res) {
  console.log('/app/ ', req.path)
  res.sendFile(path.join(__dirname + '/../client/' + req.path));
});

app.get('/*', function (req, res) {
  console.log('/ ', req.path)
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});