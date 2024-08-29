const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    train_name: String,
    WAG: String,
    from: String,
    fromcode: String,
    fromaddress: String,
    to: String,
    tocode: String,
    toaddress: String,
    departure: String,
    arrival: String,
    duration: String,
    price:String,
    seats:Array
});

module.exports = mongoose.model('Train', trainSchema);
