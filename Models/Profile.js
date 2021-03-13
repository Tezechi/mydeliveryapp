//61-- Require mongoose first. Then use mongoose schema object to create our profile schems 62
const mongoose = require('mongoose');

//63- Mongoose schema. Then use it to create our Profile Schema 64
const Schema = mongoose.Schema;

//64 Create the scheme here. After creating the profile schema, rem to export it as below 65-
const ProfileSchema = new Schema({
  //Since the profile is going to contain everything in the users schema, we get the uaers schema first....
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users' // the collection in the database for the userSchema
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
//   skills: {
//     type: [String],
//     required: true
//   },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
//   experience: [
//     {
//       title: {
//         type: String,
//         required: true
//       },
//       company: {
//         type: String,
//         required: true
//       },
//       location: {
//         type: String
//       },
//       from: {
//         type: Date,
//         required: true
//       },
//       to: {
//         type: Date
//       },
//       current: {
//         type: Boolean,
//         defauit: false
//       },
//       description: {
//         type: String
//       }
//     }
//   ],
//   education: [
//     {
//       school: {
//         type: String,
//         required: true
//       },
//       degree: {
//         type: String,
//         required: true
//       },
//       fielofstudy: {
//         type: String,
//         required: true
//       },
//       from: {
//         type: Date,
//         required: true
//       },
//       to: {
//         type: Date
//       },
//       current: {
//         type: Boolean,
//         defauit: false
//       },
//       description: {
//         type: String
//       }
//     }
//   ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instragram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
//65-We export the profile Schema here...66-Next steps....
const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
//66-Next steps,we want to handle the protected route for the currently logged in User,  we go to the profile route in the routes folder for that, bring in our dependencies first 67...
