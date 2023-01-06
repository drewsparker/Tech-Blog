const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

// Get user route by ID 
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_content', 'created_at'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title'],
          },
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

// Create a new user
router.post('/', (req, res) => {
  const { username, email, password, twitter, github } = req.body;

  // Check if all required fields are present
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Please provide a username, email, and password' });
    return;
  }

  // Check if user with provided email already exists
  User.findOne({
    where: { email }
  })
    .then(user => {
      if (user) {
        res.status(400).json({ message: 'A user with that email already exists' });
        return;
      }

      // If no user with provided email exists, create a new user
      User.create({
        username,
        email,
        password,
        twitter,
        github
      })
        .then(dbUserData => {
          // Save user data to session
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.twitter = dbUserData.twitter;
          req.session.github = dbUserData.github;
          req.session.loggedIn = true;

          res.json(dbUserData);
        });
    });
});

// User login 
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address can be found at this time!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.twitter = dbUserData.twitter;
      req.session.github = dbUserData.github;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now being escorted to log in page' });
    });
  });
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// Put for updating the user ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Find the user with the specified ID
    const user = await User.findByPk(req.params.id);

    // If no user was found, return a 404 status code
    if (!user) {
      res.status(404).json({ message: 'No user found' });
      return;
    }

    // Update the user with the new data from the request body
    await user.update(req.body);

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete route by user ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
  const user = await User.findByPk(req.params.id);
  if (!user) {
  return res.status(404).json({ message: 'No user found' });
  }
  await user.destroy();
  return res.json({ message: 'User deleted' });
  } catch (err) {
  console.log(err);
  return res.status(400).json(err);
  }
  });

module.exports = router;