//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('./Models/Users');
const Category = require('./Models/Category');
const Profile = require('./Models/Profile');
const Products = require('./Models/Products');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('./Config/Keys');
const gravatar = require('gravatar');
const cors = require('cors');
const Delivery = require('./Models/Delivery');
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');
const validateProfileInput = require('./validation/profile');
const validateProductInfo = require('./validation/products');
const validateCategoryInfo = require('./validation/category');
// const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
var fs = require('fs');
// const fileUpload = require('express-fileupload');
// const dbobj = require('./dbobj');
// const IsEmpty = require('./validation/is-empty');

//const url = 'mongodb://toadeznet:tochukwu123456@ds151820.mlab.com:51820/deliverystore';

//mongoose.connect(url).then(() => console.log('Connected to Delivery Stores database')).catch(err => console.log(err));

const app = express();
app.use(express.json()); // Make sure it comes back as json
// app.use(fileUpload());
// app.use(methodOverride('_method'));

//11- Use the mongoose and the key to connect the server to the database.First get the key to the uri. after that connect to the DB-12
const db = require('./Config/Keys').mongoURI;
const { Session } = require('inspector');
//const client = new MongoClient(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// 12- Connect to the DB using mongoose. Mongoose.connect is a promise, if successful, we use .then and pass a callback fxtn to log success on the console, if failure, we use .catch to log the error. Next we create our routes for the backend api to serve json to our database. Create a folder called routes, inside the folder, create another folder called api, inside api, create files to hold posts, profiles and users. Require those files above. 13
 //const connection = db;


 mongoose.connect(db,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true, })
.then(() => console.log('MongoDB at mlab connected'))
.catch(err => console.log(err));


// const conn = mongoose.connection;

//INIT GFS
// let gfs;
// conn.once("open", ()=>{
//   // gfs = Grid(conn.db, mongoose.mongo); 
//   // gfs.collection('products');
// console.log("Success again");
// });

// CREATE STORAGE ENGINE
// var storage = new GridFsStorage({
//   url:db,
//   file:(req, file) =>{
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if(err){
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'products'
//         };
//         resolve(fileInfo)
//       });
//     });
//   }
// });
// const upload = multer({storage});


    //const connection = "mongodb+srv://username:<password>@<cluster>/<database>?retryWrites=true&w=majority";
//mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
//.then(() => console.log("Database Connected Successfully"))
//.catch(err => console.log(err)); //

// Passport Strategy
require('./Config/passport')(passport);
app.use(passport.initialize());



//CORS
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With'
  );
  res.header('Access-Control-Allow-Headers', 'Authorization');
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(express.static(__dirname+'./public/'))


// 3-Create a basic home route for testing
app.get('/', (req, res) => res.send('Hello Towas'));


//POST NEW USER



// client.connect(err => {
//   const collection = client.db("deliverystore").collection("");
//   // perform actions on the collection object
//   client.close();
// });




app.post('/register', (req, res) => {
    // 51- Here, we pull the errors and isValid from register.js and passin req.body bc we are validating everything sent in the requests body.
    const {errors, isValid} = validateRegisterInput(req.body);
    //52- Check for errors in the Input of register form. Every route that handles user Input must first implement this error. Let us put our email error in better shape using this error object we now have. 53-
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    // here, findOne compares the email in the database with the one in the body of our requests..
    // findOne can use callback or promise, we use promise here,
    Users.findOne({email: req.body.email})
      // the promise gives us the user with that email ,
      .then(user => {
        // then we check if the user exists, if yes,
        if (user) {
          errors.email = 'Email already Exists!!';
          return res.status(400).json(errors);
        } else {
          // We create a new User Schema with the req body`s parameters
          // 25 Make a variable for our avatar to use Gravatar. Next, we have to encrypt the password using bcryptjs, first we require it above -26
          const avatar = gravatar.url(req.body.email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default
          });
          const newUser = new Users({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password2: req.body.password2,
            date: req.body.date,
            avatar, // We have to npm install Gravatar in order to use it . After you have installed it, require it here above 24
            password: req.body.password
          });
          // 27- The password hash here, we use bcrypt.gensalt to generate the salt, we pass in 10 characters with a callback fxtn that accepts err and the salt as args.................Next we use postman to create a user and verify in mlab if it is added. Then we handle the route for users logging in to our app.28 .. Down below, we create the route for login-28
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Otherwise new user`s password equals hash
              newUser.password = hash;
              // Then save it using mongoose save() which is a promise
  
              newUser
                .save()
                // if successful, gives us the user, and we set it in resp of json
                .then(user => res.json(user))
                // if not successful, catch an error, and we consol log it
                .catch(err => console.log(err));
            });
          });
        }
      });
    // Users.create({
    //   first_name: req.body.first_name,
    //   last_name: req.body.last_name,
    //   phone_number: req.body.phone_number,
    //   address: req.body.address,
    //   email: req.body.email,
    //   username: req.body.username,
    //   password: req.body.password,
    //   password2: req.body.password2,
    //   date: req.body.date
    // }).then(User => {
    //   res.json(User);
    // });
  });





  
// Login User
// 28- Handle route for loging in. 29 for Next steps,,,
// @route POST /login
// @desc Login User / Returning Token
// @access Public
app.post('/login', (req, res) => {
    // const password = req.body.password;
    // Users.findOne({
    //   email: req.body.email
    // }).then(user => {
    //   if (!user) {
    //     console.log('User not in database');
    //     return res.status(404).json(err);
    //   }
    //   if (password != user.password) {
    //     console.log('User not in Database');
    //     return res.status(404).json(err);
    //   }
    //   res.json(user);
    // });
    // Bring in the validator here
    const {errors, isValid} = validateLoginInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    } // 57-Ends here.. Next Re-Write the email errors 58-
    // since they are going to be loging in with their email and password, we declare them here as variable from body parser
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    Users.findOne({email}) //User.findOne({email : email})
      // If the User with the email and username matches, give us the user
      .then(user => {
        //Check for User
        if (!user) {
          errors.email = 'User not found';
          return res.status(404).json(errors);
        }
        // If user is found, we check password with bcrypt since the one in database is encrypted
        // compares password from our req we declared above ie the one from form to the one int the database of user returned.
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            //31 comment  out
            //res.json({ msg: 'Success' });// 33-Test with postman
            //33 Sign the user token, but we need a payload for the token, so lets create the payload
            //34 Create payload
            const payload = {
              id: user.id,
              address: user.address,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              avatar: user.avatar
            };
            //35-since we need a secret key as arg for jwt, let us go to config/keys and create a key there 36
            // 38- We now sign the user jwt
            //39-Test with Postman....40 Next Steps
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                res.json({Success: true, token: 'Bearer ' + token});
              }
            );
          } else {
            //59-Declare password errors here frist
            errors.password = 'Password Incorrect';
            // return res.status(400).json({password: 'Password Incorrect'});//59B comment this out
            return res.status(400).json(errors); //59C- Re-write the errors...... Test with postman...Below for Next Steps...60-
          }
        });
      });
  });
  



  // The Protected Route. // Test with postman...Next Steps
// @route GET api/users/curent
// @desc Returns the Current User
// @access Private
app.get(
    '/current',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      // res.json({ msg: 'Success' });
      res.json(req.user);
    }
  );

  //Create Profile for Store User


  //70- Create the profile creating route  here...Next Steps below...71..
// @route POST api/profile
// @desc Creates  or Updates Profile route
// @access Private

app.post('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
  //73 Check Validation, however, remember to import the profile validator above...74-
  const {errors, isValid} = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get all the fields from the profile form.... for validation...
  const profileFields = {};
  //Since we will be getting the user object from the request, let us declare it here..

  profileFields.user = req.user.id; // includes the avatar, name and email of the user

  // Get all the fields from the request body.....

  if (req.body.handle) {
    profileFields.handle = req.body.handle;
  }
  if (req.body.company) {
    profileFields.company = req.body.company;
  }
  if (req.body.website) {
    profileFields.website = req.body.website;
  }
  if (req.body.location) {
    profileFields.location = req.body.location;
  }

  if (req.body.status) {
    profileFields.status = req.body.status;
  }

  if (req.body.bio) {
    profileFields.bio = req.body.bio;
  }
  if (req.body.githubusername) {
    profileFields.githubusername = req.body.githubusername;
  }

  // Skills is going to come in as comma separated values, so we put it into a comma separared arrays....

  // if (typeof req.body.skills !== undefined) {
  //   profileFields.skills = req.body.skills.split(',');
  // }

  //Let us handle social here.. since social is its own object, we initialize it first, otherwise, it will tell us that social is unknown...
  profileFields.social = {};

  if (req.body.youtube) {
    profileFields.social.youtube = req.body.youtube;
  }
  if (req.body.twitter) {
    profileFields.social.twitter = req.body.twitter;
  }
  if (req.body.facebook) {
    profileFields.social.facebook = req.body.facebook;
  }
  if (req.body.linkedin) {
    profileFields.social.linkedin = req.body.linkedin;
  }
  if (req.body.instagram) {
    profileFields.social.instagram = req.body.instagram;
  }

  // Let us do logic as to when the user wants to update his.her profile if it exists or create a new one if not exist.....
  // find the user using the logged in user id...
  Profile.findOne({user: req.user.id}).then(profile => {
    if (profile) {
      // UPDATE
      Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      ).then(profile => res.json(profile));
    } else {
      // CREATE NEW PROFILE
      // Before we create a new profile, we check to see if the handle exists already
      Profile.findOne({handle: profileFields.handle}).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists!!';
          res.status(400).json(erros);
        } else {
          // We save the new Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
      });
    }
  });
});

//CREATE PRODUCT CATEGORY
app.post('/category', passport.authenticate('jwt', {session:false}), (req, res)=>{


  const {errors, isValid} = validateCategoryInfo(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
Category.findOne({categoryName: req.body.categoryName})
.then(productCategory =>{
  if(productCategory){
    errors.productCategory = 'Category already Exists!!';
    return res.status(400).json(errors);
  } else {

  const newCategory =  new Category({
    user : req.user.id,
categoryName :req.body.categoryName

  
  });

   newCategory.save()
    .then(productCategory =>{
      res.json(productCategory)
    })
    .catch(err => console.log(err) );
  }
})
} )

//GET ALL CATEGORIES
app.get('/categories', function (req, res) {
  Category.find({}).then(function (categories) {
    res.send(categories);
  });
});


// app.post('/products', passport.authenticate('jwt',{session:false}), (req,res)=>{
//   const {errors, isValid} = validateProductInfo(req.body);
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
// Products.findOne({productName:req.body.productName})
// .then(product =>{
//   if(product){
//     errors.productName = 'Product already Exists!!';
//     return res.status(400).json(errors);
//   } else{

// const newProduct = new Products(
//   {
//     ProductName: req.body.productName,
//     ProductPrice: req.body.productPrice,
//     ProductCategory: req.body.productCategory,
//     ProductDescription: req.body.productDescription,
//     productProfile: req.body.productProfile,
//     productImage: req.body.productImage
//   })
//   newProduct.save()
//   .then(newproduct =>{
//     res.json(newproduct);
//   })
//   .catch(err =>{
//     console.log(err);
//   })


//   }
// });
// } );

//69- Create the protected route here...Next, a user who has not created a profile will be redirected to a page to create profil,,,let us do a route for the page 70
// @route GET api/profile
// @desc Tests Profile route
// @access Private
app.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no Profile for this User';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
//LET~S CREATE PRODUCT
app.post('/product', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validateProductInfo(req.body);
  if(!isValid){
    return res.status(404).json(errors);
  }
  const productName = req.body.productName;
  Products.findOne({productName})
  .then(product => {
    if(product) {
      errors.productName = 'Product with Name Already Exists';
      return res.status(400).json(errors);
    } else {
      const newProduct = new Products({
        productName : req.body.productName,
        productPrice : req.body.productPrice,
        productCategory : req.body.productCategory,
        productDescription : req.body.productDescription,
        productImage : req.body.productImage,
        productProfile: req.body.productProfile
      });
      newProduct.save()
      .then(product => res.json(product))
      .catch(err => console.log(err));
    }
  });
});

// GET A Profiles products
app.get('/product', passport.authenticate('jwt', {session:false}), (req, res) => {
  Products.find({}).then(products =>{
    if(products){
  res.json(products)  
    }
  }).catch(err => res.status(404).json({noproductfound: 'No Products found for this Profile'}))
})
// 4- we create a port const for our server. for deployment, it will use the env port, but for our dev, we use port 5000
//const port = process.env.port;

// 5- We tell our server about the port we created for it using the listen method, which accepts 2 args the port and a call back fxtn for us to pass a message
app.listen(process.env.PORT, '0.0.0.0') // save and type node server to run our server.
