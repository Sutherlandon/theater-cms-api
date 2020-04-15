const mongoose = require('mongoose');
const env = process.env.NODE_ENV;

let db = 'theater-cms-dev';
if (env === 'test') {
  db = 'theater-cms-test';
}

mongoose.connect(`mongodb://localhost/${db}`, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.once('open', () => {
  if (env !== 'test') {
    console.log(`Connected to the mongo:${db}`)
  }
});