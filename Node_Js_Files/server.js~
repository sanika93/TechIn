console.log("May the Node be with you");
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var db

MongoClient.connect('mongodb://localhost/TechIn', (err,database) => {
	if(err) return console.log(err)
	db = database
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

// API to insert user details into MongoDb
app.post('/register', (req, res) => {

    var fName = req.body.fName;
    var lName = req.body.lName;
    var gender = req.body.gender;
    var loginId = req.body.loginId;
    var password = req.body.Password;
  
    db.collection('user').insertOne({
        "fName" : fName,
        "lName" : lName,
        "gender" : gender,
        "loginId" : loginId,
        "password" : password
    } , function(err,doc){
    if(err){
        handleError(res, err.message, "Failed to insert user data.")
    }else{
        res.status(201).json(doc.ops[0]);
    }     
  })
})


