const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    bus_name:String,
    type:String,
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

module.exports = mongoose.model('Bus', busSchema);
