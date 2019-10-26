const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');

// Connect Dotenv
if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config({
    path: './.env',
  });
}

// Create server
const app = express();

// Connect Mongoose
mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongooseDB is connected!');
});

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  }),
);
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'cats',
    resave: true,
    saveUninitialized: true,
  }),
);
console.log('session실행중');
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
);
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const passport = require('./lib/passport')(app);
const youtube = require('./lib/youtube');

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/dictionary', require('./routes/dictionary'));
app.use('/api/myWords', require('./routes/myWords'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
