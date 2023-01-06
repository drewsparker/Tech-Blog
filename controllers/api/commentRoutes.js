const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', (req, res) => {
  const query = 'SELECT * FROM comments';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else {
      res.json(results);
    }
  });
});

// Route to create a new comment
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.user.id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    res.status(401).json({ message: "You must be logged in to create a comment" });
  }
});


// Delete comment by ID
router.delete('/:id', withAuth, (req, res) => {
  Comment.findAndCountAll({
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      if (result.count === 0) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(() => res.json({ count: result.count }))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;