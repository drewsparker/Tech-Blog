const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// define associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments',
});

module.exports = { User, Post, Comment };
