//48- import validator module first, then export it as a function.
const validator = require('validator');
const isEmpty = require('./is-empty');

//49- Export this validator as a function. Next , we go to our users route and load input validation 50.
//55B-change the name of the function to validateLoginInput....Go to users route and bring in this fxtn 56-
module.exports = function validateProductInfo(data) {
  // Initially, no errors, so lets initialize a var called errors as empty object
  let errors = {};
  //55 We have to make sure that name is an empty string.
  //Read as if data.name is not isempty,then it is whatsoever it is, but if it is isempty, then it is an emty string ''. We do same for other parameters, copr and paste and change vlalues....Next , we copy the whole logic here and paste for login.js ......
  //data.name = !isEmpty(data.name) ? data.name : '';

  // Copy and paste, then change for others
//   data.categoryId = !isEmpty(data.categoryId) ? data.categoryId : '';
  data.productName = !isEmpty(data.productName) ? data.productName : '';
  data.productPrice = !isEmpty(data.productPrice) ? data.productPrice : '';
  data.productCategory = !isEmpty(data.productCategory) ? data.productCategory : '';
  data.productDescription = !isEmpty(data.productDescription) ? data.productDescription : '';
  data.productImage = !isEmpty(data.productImage) ? data.productImage : '';
  data.productProfile = !isEmpty(data.productProfile) ? data.productProfile : '';
  // data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //54- We check when the name field is empty. Here, the name fiels is not going to be a string if passed through this validator, so it will not pass this verification, so let us make sure that it is a string first 55
  
  if (validator.isEmpty(data.productName)) {
    errors.productName = 'Product Name  field is Required';
  }
  if (validator.isEmpty(data.productPrice)) {
    errors.productPrice = 'Product Price  field is Required';
  }
  if (validator.isEmpty(data.productCategory)) {
    errors.productCategory = 'Product Category  field is Required';
  }
  if (validator.isEmpty(data.productDescription)) {
    errors.productDescription = 'Product Description  field is Required';
  }
  if (validator.isEmpty(data.productImage)) {
    errors.productImage = 'Product Image  field is Required';
  }
  if (validator.isEmpty(data.productProfile)) {
    errors.productProfile = 'Product Profile  field is Required';
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
