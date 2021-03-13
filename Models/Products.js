const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'users'
  // },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },

 
  productProfile: {
    type: String,
    required: true
  },
  productImage: {
    type:String,
    required:true
  }
});

module.exports = Products = mongoose.model('products',  ProductSchema);

