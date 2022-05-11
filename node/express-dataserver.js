// This file creates a data server which uses Express
// to retrieve data from a MongoDB instance to create
// distinct endpoints on port 3600 of locahost.

/*
    Requires
*/
require('./passport-config');

/*
    Variable declarations
*/
var User = require('./models/user');
var Music = require('./models/music');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var db;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const MongoClient = require('mongodb').MongoClient
const MONGO_DB_NAME = 'mean-music-webapp-database';
const EXPRESS_PORT = 3600;
const MONGO_DB_URL = "mongodb://localhost:27017/";
const MongoStore = require('connect-mongo');
const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'public/uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
});
const upload = multer({ storage: storage });

/*
    app use
*/
app.use(session({
  name:'mean-music-app.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  },
  store: MongoStore.create({ mongoUrl: MONGO_DB_URL + MONGO_DB_NAME })
}));
app.use(cors());
app.use(bodyParser.json({limit:'8mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'8mb'}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

/*
    Listening on port
*/
app.listen(EXPRESS_PORT, function() {
  console.log('Listening on ' + EXPRESS_PORT + '.')
})

/*
    Connections
*/
MongoClient.connect(MONGO_DB_URL, (err, client) => {
  db = client.db(MONGO_DB_NAME);
})

mongoose.connect(MONGO_DB_URL + MONGO_DB_NAME);

/*
    BASE ROUTE
*/

app.route('/').get((req, res) => {
  res.send("This is the api for the Mean Music Webapp")
})

/*
    USERS ROUTES
*/

app.route('/users').get((req, res) => {
  db.collection('users').find().toArray((err, users) => {
    if (err) throw err
    var users_list = []
    users.forEach((value) => {
      users_list.push({username: value.username})
    })
    res.send(users_list)
  })
})

app.route('/users/register').post((req, res, next) => {
  registerUser(req, res);
})

app.route('/users/logout').get((req,res,next) => {
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

const auth = () => {
  return (req, res, next) => {
      passport.authenticate('local', (error, user, info) => {
          if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
          req.login(user, function(error) {
              if (error) return next(error);
              next();
          });
      })(req, res, next);
  }
}

app.post('/auth/authenticate', auth(), (req,res) => {
  res.status(200).json({"statusCode" : 200 ,"message" : "Authentication Successful", "user": req.user});
})

/*
    MUSIC ROUTES
*/
app.route('/music').get((req, res) => {
  db.collection('musics').find().toArray((err, music) => {
    if (err) throw err
    var music_list = []
    music.forEach((value) => {
      music_list.push({audio_file: value.audio_file, artist: value.artist, 
        created_date: value.created_date, genre: value.genre, 
        image_file: value.image_file, title: value.title})
    })
    res.send(music_list)
  })
})

app.route('/music/music-upload').post((req, res, next) => {
  uploadMusic(req, res);
})

app.post('/music/upload-file', upload.single('file'), (req, res) => {
  res.status(200).json({"statusCode" : 200 ,"message" : "Successfully Uploaded File: ".concat(req.file.filename)});
})

/*
    Functions
*/

async function registerUser(req, res) {

  var user = new User({
    full_name: req.body.full_name,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
  });

  try {
    doc = await user.save();
    return res.status(200).json({message:'Successfully Registered'});
  }
  catch (err) {
    return res.status(500).json(err);
  }
}
async function uploadMusic(req, res) {
  var music = new Music({
    audio_file: req.body.audio_file,
    image_file: req.body.image_file,
    artist: req.body.artist,
    genre: req.body.genre,
    title: req.body.title,
    created_date: req.body.created_date
  });
  try {
    doc = await music.save();
    return res.status(200).json({message:'Successfully Uploaded Music'});
  }
  catch (err) {
    return res.status(500).json(err);
  }
}



    