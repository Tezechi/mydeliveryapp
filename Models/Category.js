//19- Require mongoose first. Then use mongoose schema object to create our user schems 20
const mongoose = require('mongoose');

//20 Mongoose schema. Then use it to create our User Schema 21
const Schema = mongoose.Schema;
//21 Create the scheme here. After creating the user schema, rem to export it as below 22
const CategoryShema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' // the collection in the database for the userSchema
      },
  categoryName: {
    type: String,
    required: true
  },
  CreationDate: {
    type: Date,
    default: Date.now
  }
});

// 22 - Export the schema here. Next steps - we flip over to our users route and create a route for user registrations-23
module.exports = Category = mongoose.model('category', CategoryShema);
