const db = require("../config/config");
const {Sequelize, DataTypes} = require("sequelize");

  const Comment = db.define("comment", {

UserName: {
  type: DataTypes.STRING
},
title: {
  type: DataTypes.STRING
},
imageUrl: {
    type: DataTypes.STRING
},
content: {
  type: DataTypes.STRING
},
postId: {
  type: DataTypes.INTEGER
}
});
Comment.sync({force : false})
module.exports = Comment;