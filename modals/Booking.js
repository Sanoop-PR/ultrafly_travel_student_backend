const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    bookingType: { type: String, enum: ['Flight', 'Bus', 'Train', 'Hotel'], required: true },
    from: String,
    to: String,
    departureTime: String,
    returnTime: String,
    travelerCount: Number,
    classType: String,
    selectedSeats: [String], // Ensure this is an array of strings
    roomNumber: Number,
    price: Number,
    approved: { type: Boolean, default: false },
    vehicleId:{type:String},
    vehicleName:String,
    duration:String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
