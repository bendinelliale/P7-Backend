const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserPost = require('../models/user-post');
const fs = require('fs');
const Sequelize = require('sequelize');


exports.ceateUserPosts = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const userPost = new UserPost({
    userId: req.body.userId,
    postId:req.body.postId
  });
  userPost.save().then(
    () => {
      res.status(201).json({
        message: 'User-Post added successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};


exports.getAllUserPosts = (req, res, next) => {
  // following works with id but not with userId
  // UserPost.findOne(
  //   {where: { id: req.params.id }}
  UserPost.findAll(
    {where: { userId: req.params.id }}
    ).then(
    (userPost) => {
      res.status(200).json(userPost);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deletePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id }
  }).then(
    (post) => {
      post.destroy().then(
        () => {
          res.status(200).json({
            message: ' Post Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );

    }
  );
};