const Booking = require('../modals/Booking');
const Flight = require('../modals/flight');
const Train = require('../modals/Train');
const Hotel = require('../modals/Hotel');
const Bus = require('../modals/bus');
const User = require('../modals/userModel');


// Book flight
exports.bookFlight = async (req, res) => {
  try {
    const { travelerCount, classType, selectedSeats, userName, userEmail, id,vehicleId,vehicleName,duration } = req.body;

    // Find the flight by its ID
    const flight = await Flight.findById(id);
    
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    
    // Initialize the 'seats' field if it doesn't exist
    if (!flight.seats) {
      flight.seats = [];
    }
    
    // Convert selectedSeats to an array if it's not
    const seatsToBook = Array.isArray(selectedSeats) ? selectedSeats : [selectedSeats];
    
    // Check if any of the selected seats are already booked
    const alreadyBooked = seatsToBook.some(seat => flight.seats.includes(seat));
    if (alreadyBooked) {
      return res.status(400).json({ message: 'One or more seats are already booked' });
    }
    
    // Add the selected seats to the flight's 'seats' array
    flight.seats.push(...seatsToBook);
    
    // Save the flight document with updated seats
    await flight.save();

    // Create booking details
    const bookingDetails = {
      username: userName,
      email: userEmail,
      bookingType: 'Flight',
      from: flight.from,
      to: flight.to,
      departureTime: flight.departure,
      returnTime: flight.arrival,
      travelerCount,
      classType,
      selectedSeats: seatsToBook,
      price: flight.price,
      approved: false,
      vehicleId,
      vehicleName,
      duration
    };

    // Save the booking in the Booking collection
    const booking = new Booking(bookingDetails);
    await booking.save();

    // Find the user by email and update their bookings
    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.booking.push(booking._id);
      await user.save(); // Save the updated user document
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// Book bus
exports.bookBus = async (req, res) => {

  try {
    const { travelerCount, classType, selectedSeats, userName, userEmail, id,vehicleId,vehicleName,duration } = req.body;

    // Find the flight by its ID
    const buses = await Bus.findById(id);
    
    if (!buses) {
      return res.status(404).json({ message: 'buses not found' });
    }
    
    // Initialize the 'seats' field if it doesn't exist
    if (!buses.seats) {
      buses.seats = [];
    }
    
    // Convert selectedSeats to an array if it's not
    const seatsToBook = Array.isArray(selectedSeats) ? selectedSeats : [selectedSeats];
    
    // Check if any of the selected seats are already booked
    const alreadyBooked = seatsToBook.some(seat => buses.seats.includes(seat));
    if (alreadyBooked) {
      return res.status(400).json({ message: 'One or more seats are already booked' });
    }
    
    // Add the selected seats to the buses's 'seats' array
    buses.seats.push(...seatsToBook);
    
    // Save the buses document with updated seats
    await buses.save();

    // Create booking details
    const bookingDetails = {
      username: userName,
      email: userEmail,
      bookingType: 'Bus',
      from: buses.from,
      to: buses.to,
      departureTime: buses.departure,
      returnTime: buses.arrival,
      travelerCount,
      classType,
      selectedSeats: seatsToBook,
      price: buses.price,
      approved: false,
      vehicleId,
      vehicleName,
      duration
    };

    // Save the booking in the Booking collection
    const booking = new Booking(bookingDetails);
    await booking.save();

    // Find the user by email and update their bookings
    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.booking.push(booking._id);
      await user.save(); // Save the updated user document
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

};

exports.bookTrain = async (req, res) => {
  try {
    const { travelerCount, classType, selectedSeats, userName, userEmail, id,vehicleId,vehicleName,duration } = req.body;

    const train = await Train.findById(id);
    
    if (!train) {
      return res.status(404).json({ message: 'train not found' });
    }
    
    if (!train.seats) {
      train.seats = [];
    }
    
    const seatsToBook = Array.isArray(selectedSeats) ? selectedSeats : [selectedSeats];
    
    const alreadyBooked = seatsToBook.some(seat => train.seats.includes(seat));
    if (alreadyBooked) {
      return res.status(400).json({ message: 'One or more seats are already booked' });
    }
    
    train.seats.push(...seatsToBook);
    
    await train.save();

    const bookingDetails = {
      username: userName,
      email: userEmail,
      bookingType: 'Train',
      from: train.from,
      to: train.to,
      departureTime: train.departure,
      returnTime: train.arrival,
      travelerCount,
      classType,
      selectedSeats: seatsToBook,
      price: train.price,
      approved: false,
      vehicleId,
      vehicleName,
      duration
    };

    const booking = new Booking(bookingDetails);
    await booking.save();

    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.booking.push(booking._id);
      await user.save(); // Save the updated user document
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Search available buses
exports.allBooking = async (req, res) => {
  try {
    const buses = await Booking.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get Flight 
exports.getFlight = async (req, res) => {
  try {
    const { from, to } = req.body
    const flights = await Flight.find({ from, to });
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const { id } = req.params
    const flights = await Flight.find({ _id: id });
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get train 
exports.getTrain = async (req, res) => {
  try {
    const { from, to  } = req.body
    const trains = await Train.find({ from, to  });
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrainById = async (req, res) => {
  try {
    const { id } = req.params
    const trains = await Train.find({ _id: id });
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get Bus 
exports.getBus = async (req, res) => {
  try {
    const { from, to } = req.body
    const buses = await Bus.find({ from, to });
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getBusById = async (req, res) => {
  try {
    const { id } = req.params
    const buses = await Bus.find({ _id: id });
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get Hotel 
exports.getHotel = async (req, res) => {
  try {
    const { place } = req.body
    const hoteles = await Hotel.find({ place });
    res.status(200).json(hoteles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get Hotel 
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params
    const details = await Booking.findOne({ _id:id });
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};