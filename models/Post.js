const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// define columns for Post model
const columns = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    },
  },
};

// define options for Post model
const options = {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'post',
};

// initialize Post model with columns and options
Post.init(columns, options);

module.exports = Post;
