const validator = require('validator');
const isEmpty = require('./is-empty');

//- Export this validator as a function. Next , we go to our users route and load input validation
module.exports = validateRegisterInput = data => {
  // Initially, no errors, so lets initialize a var called errors as empty object
  let errors = {};

  //We have to make sure that name is an empty string.
  //Read as if data.name is not isempty,then it is whatsoever it is, but if it is isempty, then it is an emty string ''. We do same for other parameters, copy and paste and change vlalues....Next , we copy the whole logic here and paste for login.js ......
  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';

  //We want to check if the name on the form is more than 2 chars, but less than 30 chars
  if (!validator.isLength(data.first_name, {min: 2, max: 30})) {
    errors.first_name = 'First Name must be between 2 and 30 characters';
  }

  if (!validator.isLength(data.last_name, {min: 2, max: 30})) {
    errors.last_name = ' Last Name must be between 2 and 30 characters';
  }
  if (!validator.isLength(data.username, {min: 2, max: 10})) {
    errors.username = 'User`s Name must be between 2 and 10 characters';
  }

  //Check is the email is valid......
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid';
  }

  if (validator.isEmpty(data.first_name)) {
    errors.first_name = 'First Name field is Required';
  }

  if (validator.isEmpty(data.last_name)) {
    errors.last_name = 'Last name  field is Required';
  }

  if (validator.isEmpty(data.username)) {
    errors.username = 'User Name field is Required';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is Required';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is Required';
  }
  //Check that Phone Number is there
  if (validator.isEmpty(data.phone_number)) {
    errors.phone_number = 'Your  Phone Number is Required to Contact You';
  }

  //Check that Address is there
  if (validator.isEmpty(data.address)) {
    errors.address = 'Address field is Required';
  }

  // Check the lenght of the password-6min, and 30 max
  if (!validator.isLength(data.password, {min: 6, max: 15})) {
    errors.password = 'Password must be between 6 and 15 is Required';
  }

  // Check if Password2 Matches Password
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    //We create a special isEmpty function to handle our Validatiion when the values are empty. So we create a new file called is-empty.And we use it to wrap the isValid errors below, rem to import the fxtn above.
    errors: errors,
    isValid: isEmpty(errors)
  };
};
