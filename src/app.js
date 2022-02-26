const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const { routes } = require('./routes');

const app = express();
dotenv.config();

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: 'session'
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todostask');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      store: store,
      cookie: { expires: 60000 }, })
)

routes.forEach((item) => {
  app.use(`/api/v1/${item}`, require(`./routes/${item}`));
});


let PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`Server running at ${PORT}`);
