require("dotenv").config({path: __dirname + '/.env'});

const express = require('express');
const app = express();
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');
const path = require('path');
const db = require('./config/config');
const Comment = require('../Backend/models/comment')

db.authenticate().then( () =>console.log("Data  Base Connected !")).catch((err) => console.log(err));
db.sync({force:false}).then(()=>{console.log("sync complete")})
  app.use(express.json());
  //Comment.sync({force : true})
  //app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/auth', userRoutes); 
  app.use('/api/comments', commentRoutes); 


module.exports = app;