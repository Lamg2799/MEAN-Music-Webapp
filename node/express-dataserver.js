// This file creates a data server which uses Express
// to retrieve data from a MongoDB instance to create
// distinct endpoints on port 3600 of locahost.


/*
    Variable declarations
*/
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const MongoClient = require('mongodb').MongoClient
var User = require('./models/user');
var passport = require('passport');
require('./passport-config');
var mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo');

var db
const MONGO_DB_NAME = 'mean-music-webapp-database'
const EXPRESS_PORT = 3600
const MONGO_DB_URL = "mongodb://localhost:27017/"

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

/*
    Listening on port
*/
app.listen(EXPRESS_PORT, function() {
  console.log('Listening on ' + EXPRESS_PORT + '.')
})

/*
    app use
*/
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

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

app.route('/users/login').post((req,res,next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.json(user)
    });
  })(req, res, next);
})

app.route('/users/register').post((req, res, next) => {
  registerUser(req, res);
})

app.route('/users/logout').get((req,res,next) => {
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})




/*
    MUSIC ROUTES
*/
app.route('/music').get((req, res) => {
  db.collection('music').find().toArray((err, music) => {
    if (err) throw err
    var music_list = []
    music.forEach((value) => {
      music_list.push({audio_file: value.audio_file, artist: value.artist, comments: value.comments, 
        created_date: value.created_date, description: value.description, genre: value.genre, 
        image: value.image, ratings: value.ratings, title: value.title})
    })
    res.send(music_list)
  })
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
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}
    