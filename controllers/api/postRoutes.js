const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: ["id", "title", "created_at", "post_content"],
    order: [["created_at", "DESC"]],
  })
    .then((posts) => {
      const postPromises = posts.map((post) => {
        return Comment.findAll({
          where: {
            post_id: post.id,
          },
          include: [
            {
              model: User,
              attributes: ["username", "twitter", "github"],
            },
          ],
        }).then((comments) => {
          post.dataValues.comments = comments;
          return post;
        });
      });
      Promise.all(postPromises).then((postData) => {
        res.json(postData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const query = `
    SELECT p.id, p.title, p.created_at, p.post_content, 
           u1.username AS post_author, u1.twitter AS post_twitter, u1.github AS post_github,
           c.id AS comment_id, c.comment_text, c.created_at,
           u2.username AS comment_author, u2.twitter AS comment_twitter, u2.github AS comment_github
    FROM posts AS p
    INNER JOIN users AS u1 ON p.user_id = u1.id
    LEFT JOIN comments AS c ON p.id = c.post_id
    LEFT JOIN users AS u2 ON c.user_id = u2.id
    WHERE p.id = :id
  `;

  Post.findOne({
    raw: true,
    replacements: { id: req.params.id },
    nest: true,
    plain: true,
    attributes: [
      [sequelize.literal(query), "post"]
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    // Find the post in the database using the id specified in the request params
    const post = await Post.findByPk(req.params.id);

    // If no post was found, return a 404 response
    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // Update the post's title and post_content attributes with the values from the request body
    post.title = req.body.title;
    post.post_content = req.body.post_content;

    // Save the updated post to the database
    await post.save();

    // Return the updated post data to the client
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, (req, res) => {
  const postId = req.params.id;
  Post.findOne({
    where: {
      id: postId
    }
  }).then(post => {
    if (!post) {
      return res.status(404).json({ message: 'No post found with this id' });
    }
    return post.destroy()
      .then(() => res.json({ message: 'Post deleted' }))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

module.exports = router;
