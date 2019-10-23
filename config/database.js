const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/theater-cms-dev', {
  useNewUrlParser: true,
});

const mongodb = mongoose.connection;
mongodb.once('open', () => console.log('Connected to the mongo:theater-cms-dev'));

// // load the database, if it's the first time load it with test data
// try {
//   await db.loadDatabase({});

//   // load test data
//   let Movies = db.getCollection('movies');
//   if (Movies === null) {
//     console.log('loading test movies...');
//     Movies = db.addCollection('movies');
//     require('./test_data.js').movies.forEach(movie => Movies.insert(movie)); 
//   }

//   let Users = db.getCollection('users');
//   if (Users === null) {
//     console.log('loading test users...');
//     Users = db.addCollection('users');
//     [{
//       username: 'landon',
//       password: 'hello'
//     }, {
//       username: 'liese',
//       password: 'world'
//     }]
//       .forEach(user => Users.insert(user));
//   }

//   console.log('initialized DB');
// } catch(err) {
//   console.log(`Error: ${err}`)
// }