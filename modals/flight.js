const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name:String,
    from:String,
    fromcode:String,
    fromaddress:String,
    to:String,
    tocode:String,
    toaddress:String,
    departure:String,
    arrival:String,
    duration:String,
    price:String,
    seats:Array
});

module.exports = mongoose.model('Flight', flightSchema);
