const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  place:String,
    name: String,
    price:Number,
    beds: Number,
    guests: Number,
    description: String,
    tax: Number,
    type: String,
    near:Boolean
});

module.exports = mongoose.model('Hotel', hotelSchema);
