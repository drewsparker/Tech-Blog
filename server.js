const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

// Create handlebars instance with custom helpers
const hbs = exphbs.create({ helpers });

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up session store using Sequelize and session middleware
const sessionStore = new SequelizeStore({ db: sequelize });
app.use(session({
  secret: 'drewsparker',
  cookie: {
    expires: 20 * 60 * 1000, // Session will automatically expire in 20 minutes
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: sessionStore,
}));

// Set up middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use routes defined in controllers module
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
