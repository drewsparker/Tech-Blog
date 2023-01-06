const { Comment } = require('../models');

const commentData = [
  {
    user_id: 2,
    post_id: 5,
    comment_text: "I can't believe this is finally happening! Congratulations to everyone involved."
  },
  {
    user_id: 1,
    post_id: 4,
    comment_text: "This is such an exciting development! I can't wait to see what the future holds for this project."
  },
  {
    user_id: 3,
    post_id: 4,
    comment_text: "Great work on this project! I'm looking forward to using it in my own workflow."
  },
  {
    user_id: 5,
    post_id: 3,
    comment_text: "This is a game-changer for productivity! Thank you for creating this tool."
  },
  {
    user_id: 4,
    post_id: 2,
    comment_text: "I've been waiting for something like this for a long time. Can't wait to get started!"
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: "I'm really excited to try this out. Keep up the good work!"
  },
  {
    user_id: 3,
    post_id: 1,
    comment_text: "This looks like a fantastic resource. I can't wait to start using it!"
  },
  {
    user_id: 5,
    post_id: 5,
    comment_text: "This is an amazing achievement! Congratulations to everyone involved."
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

