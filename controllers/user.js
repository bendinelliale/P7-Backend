const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/user');

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          UserName: req.body.UserName,
          UserEmail: req.body.UserEmail,
          password: hash,
          postView: '1'
        });
        user.save().then(() => {
          res.status(201).json({
            message: 'User added successfully!'
          });
        }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    );
  };

  exports.login = (req, res, next) => {
      User.findOne({where: { UserEmail: req.body.email }}).then(
      (user) => {
        if (!user) {
          return res.status(404).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(404).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign(
              { userId: user.id },
              process.env['JWT'],
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user.id,
              userName: user.UserName,
              userEmail: user.UserEmail,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        ); 
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }

  exports.deleteUser = (req, res, next) => {
    User.findOne({
      where: { id: req.params.id }
      }).then(
      (user) => {
          user.destroy().then(
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

  exports.getOneUser = (req, res, next) => {
    User.findOne({
      where: { id: req.params.id }
    }).then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.getAllUsers = (req, res, next) => {
    User.findAll(
      ).then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.updateView = (req, res, next) => {
  User.upsert({
    id: req.params.id,
    postView: req.body.postView,
  });
};