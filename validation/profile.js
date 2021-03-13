//72- Profile validation implementation...Do not mind the numbers, it is from copy and paste from login.js... Next, we put this validation in the profile POST routes 73-...
//48- import validator module first, then export it as a function.
const validator = require('validator');
const isEmpty = require('./is-empty');

//49- Export this validator as a function. Next , we go to our users route and load input validation 50.
module.exports = function validateProfileInput(data) {
  // Initially, no errors, so lets initialize a var called errors as empty object
  let errors = {};
  //55 We have to make sure that name is an empty string.
  //Read as if data.name is not isempty,then it is whatsoever it is, but if it is isempty, then it is an emty string ''. We do same for other parameters, copr and paste and change vlalues....Next , we copy the whole logic here and paste for login.js ......
  data.handle = !isEmpty(data.handle) ? data.handle : '';

  // Copy and paste, then change for others
  data.status = !isEmpty(data.status) ? data.status : '';
  // data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.website = !isEmpty(data.website) ? data.website : '';
  data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
  data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
  data.facebook = !isEmpty(data.facebook) ? data.facebook : '';
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';
  data.instagram = !isEmpty(data.instagram) ? data.instagram : '';

  //We want to check if the handle is more than 40  chars
  if (!validator.isLength(data.handle, {min: 2, max: 40})) {
    errors.handle = 'Handle needs to be berween 2 and 40 characters';
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile Handle required';
  }

  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field  required';
  }

  // if (validator.isEmpty(data.skills)) {
  //   errors.skills = 'Status Field is required';
  // }

  // Although, website is not required, but we want to make sure that it is a url whenever present

  if (!validator.isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  //Check for all the social urls

  if (!validator.isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!validator.isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!validator.isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!validator.isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!validator.isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    //We create a special isEmpty function to handle our Validatiion when the values are empty. So we create a new file called is-empty.And we use it to wrap the isValid errors below, rem to import the fxtn above.
    errors: errors,
    isValid: isEmpty(errors)
  };
};
