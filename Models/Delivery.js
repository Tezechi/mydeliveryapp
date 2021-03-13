const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  delivery_name: {
    type: String,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  delivery_phone_number: {
    type: String,
    required: true
  }
});

const Delivery = mongoose.model('delivery', DeliverySchema);
module.exports = Delivery;
