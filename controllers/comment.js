const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const Comment = require('../models/comment');
const fs = require('fs');

exports.createComment = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const comment = new Comment({
        
        content: req.body.content,
        UserName: req.body.UserName,
        userId: req.userId,
        title : req.body.title,
        imgaeUrl : url + '/images/' + req.body.imageUrl ,
        postId : req.body.postId
      
    });
    comment.save().then(
      () => {
        res.status(201).json({
          message: 'Comment added successfully!'
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

  exports.deleteComment = (req, res, next) => {
    Comment.findOne({
      where: { id: req.params.id }
      }).then(
      (comment) => {
          comment.destroy().then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
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

  exports.getComments = (req, res, next) => {
    Comment.findAll({
      where: { postId: req.params.id }
    }).then(
      (comment) => {
        res.status(200).json(comment);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };


  exports.updateView = (req, res, next) => {
  Comment.upsert({
    id: req.params.id,
    postView: req.body.postView,
  });
};
  

exports.updateComment = (req, res, next) => {
  if (!req.body.article.content || !req.body.commentId) {
    return res.status(400).json({
      error: 'Bad request, need user Id and article object',
    })
  }
  Article.update(
    {
      content: req.body.article.content,
      CommentId: req.body.commentId,
    },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(201).json({ message: 'Comment modified!' }))
    .catch(error =>
      res
        .status(400)
        .json({ message: 'Error editing comment!', error })
    )
}

