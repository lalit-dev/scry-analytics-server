/**
 @author: Lalit Yadav
 configuration is define to make connection with the database.
*/

const mongoose = require('mongoose')

class DbInstance {
  constructor() {
    mongoose.connect('mongodb://localhost:27017/scryanalytics', {useNewUrlParser: true, useUnifiedTopology: true});
    this.db = mongoose.connection;

    this.db.on('error', (error) => {
      console.error('DB connection Failed:', error)
    });
    this.db.once('open', function () {
      // we're connected!
      console.log('DB connected')
    });
  }
}




module.exports = new DbInstance().db
