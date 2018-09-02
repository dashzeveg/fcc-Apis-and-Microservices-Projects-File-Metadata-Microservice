'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
//var upload = multer({ dest: 'public/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.route('/api/fileanalyse')
  .post(upload.single('upfile'), function (req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json({"name": req.file.originalname,"type": req.file.mimetype,"size": req.file.size});
  //{"fieldname":"upfile","originalname":"Capture.PNG","encoding":"7bit","mimetype":"image/png","destination":"public/","filename":"bb5bd9dae372309b6878cb0f04673310","path":"public/bb5bd9dae372309b6878cb0f04673310","size":35624}
  
  });

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
