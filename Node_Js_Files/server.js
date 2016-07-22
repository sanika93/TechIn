console.log("May the Node be with you");
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient
const app = express();
var mongo = require('mongodb');
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
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
	app.listen(9000, () => {
		console.log('listening on 9000')
	})
})

// API to insert user details into MongoDb
/*app.post('/register', (req, res) => {

    var fName = req.body.fName;
    var lName = req.body.lName;
    var gender = req.body.gender;
    loginId = req.body.loginId;
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
});*/

//Configuring the parameters for email verification
var smtpTransport = nodemailer.createTransport("SMTP",{
    service : "Gmail",
    auth: {
        user: "usctechin@gmail.com",
        pass: "viveksakshisanika"
}
});

var rand, mailOptions, hist, link;


app.get('/',(req, res)=>{
    res.render('index')
});
var fname,lName,gender,loginId,password;
app.post('/send',(req,res)=>{
    fName = req.body.fName;
    lName = req.body.lName;
    gender = req.body.gender;
    loginId = req.body.loginId;
    password = req.body.Password;
    rand = Math.floor((Math.random()*100)+54);
    host = req.get('host');
    link = "http://"+req.get('host')+"/verify?id="+rand;
    mailOptions = {
        to: loginId,
        subject:"Please confirm your email account",
        html : "Hello<br> Please click on the link to verify your email.<br><a href ="+link+">Click here to verify!</a>"
    }
    
    smtpTransport.sendMail(mailOptions,(error, response)=>{
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent :"+ response.message);
            res.end("sent");
        }
    });
});


app.get('/verify',(req,res)=>{
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host')) == ("http://"+host))
        {
            console.log("Domain is matched. Information is from Authentic email");
            if(req.query.id == rand)
                {
                    console.log("email is verified");
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
                        //res.status(201).json(doc.ops[0]);
                        console.log("DB inserted");
                    }
                  })
                    res.render('index');
                }
            else{
                console.log("Email is not verified");
            }
        }
    else{
        res.end("<h1>Request is from an unknown source");
    }
    
});

/*Login API*/

app.post('/login', (req, res) => {

    var loginId = req.body.loginId;
    var password = req.body.password;
    var response_message = "";

    db.collection('user').findOne({ loginId : loginId }, { password : 1 } , function(err,doc){
    if(err){
        handleError(res, err.message, "Failed to retrieve data.")
    }else{
        var getpassword = doc.password;
        console.log(getpassword);
        if(password == getpassword){
            response_message = "Verified";
        }
        else{
            response_message = "Incorrect details";
        }
        res.status(200).send(response_message);
    }
  })
});

/*REST API to display all the posts based on the technology selected*/

app.get('/posts/:id', function(req, res){
    var q = req.params.id;
    console.log(q);
    var document_id;
    db.collection('tech').findOne({ name : q}, { _id : 1}, function(err, doc){
     document_id = doc._id;
     console.log(document_id);
     var o_id = document_id.toString();
     db.collection('post').find({"techId" : o_id}).toArray(function(err, docs){
        if(err) console.log("Error");
        else console.log(JSON.stringify(docs));
    });
   });
});
