const { User } = require('../models');

const userData = [
  {
    username: "jane_doe",
    twitter: "jane_doe",
    github: "jane_doe",
    email: "jane@example.com",
    password: "password1"
  },
  {
    username: "john_smith",
    twitter: "john_smith",
    github: "john_smith",
    email: "john@example.com",
    password: "password2"
  },
  {
    username: "bob_johnson",
    twitter: "bob_johnson",
    github: "bob_johnson",
    email: "bob@example.com",
    password: "password3"
  },
  {
    username: "sarah_lee",
    twitter: "sarah_lee",
    github: "sarah_lee",
    email: "sarah@example.com",
    password: "password4"
  },
  {
    username: "mike_williams",
    twitter: "mike_williams",
    github: "mike_williams",
    email: "mike@example.com",
    password: "password5"
  },
  {
    username: "emma_brown",
    twitter: "emma_brown",
    github: "emma_brown",
    email: "emma@example.com",
    password: "password6"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
