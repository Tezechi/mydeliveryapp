//48- import validator module first, then export it as a function.
const validator = require('validator');
const isEmpty = require('./is-empty');

//49- Export this validator as a function. Next , we go to our users route and load input validation 50.
//55B-change the name of the function to validateLoginInput....Go to users route and bring in this fxtn 56-
module.exports = function validateLoginInput(data) {
  // Initially, no errors, so lets initialize a var called errors as empty object
  let errors = {};
  //55 We have to make sure that name is an empty string.
  //Read as if data.name is not isempty,then it is whatsoever it is, but if it is isempty, then it is an emty string ''. We do same for other parameters, copr and paste and change vlalues....Next , we copy the whole logic here and paste for login.js ......
  //data.name = !isEmpty(data.name) ? data.name : '';

  // Copy and paste, then change for others
  // data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  // data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //We want to check if the name on the form is more than 2 chars, but less than 30 chars
  /*if (!validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters';
  } */

  //54- We check when the name field is empty. Here, the name fiels is not going to be a string if passed through this validator, so it will not pass this verification, so let us make sure that it is a string first 55
  //Also, do the valodator for other fields....
  //if (validator.isEmpty(data.name)) {
  //errors.name = 'Name field is Required';
  //}
  //Check is the email is valid......
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid';
  }
  // if (validator.isEmpty(data.username)) {
  //   errors.username = 'Username field is Required';
  // }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is Required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is Required';
  }
  // Check the lenght of the password-6min, and 30 max
  //if (!validator.isLength(data.password, {min: 6, max: 30})) {
  // errors.password = 'Password field is Required';
  // }
  //Check that Password2 is there
  // if (validator.isEmpty(data.password2)) {
  // errors.password2 = 'Confirm Password field is Required';
  // }
  // Check if Password2 Matches Password
  //if (!validator.equals(data.password, data.password2)) {
  //  errors.passwords = 'Passwords must match';
  // }
  return {
    //We create a special isEmpty function to handle our Validatiion when the values are empty. So we create a new file called is-empty.And we use it to wrap the isValid errors below, rem to inport the fxtn above.
    errors,
    isValid: isEmpty(errors)
  };
};
