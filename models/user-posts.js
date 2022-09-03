const db = require("../config/db.config");
const {Sequelize, DataTypes} = require("sequelize");

  const UserPost = db.define("UserPost", {

userId: {
  type: DataTypes.INTEGER
},
postId: {
    type: DataTypes.INTEGER
  },

});

module.exports = UserPost;