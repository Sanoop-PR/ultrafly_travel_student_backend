// const Hotel = require('../modals/Hotel');
const Booking = require('../modals/Booking');

// Search available hotel rooms
// exports.searchHotels = async (req, res) => {
//   const { location } = req.body;
//   try {
//     const hotels = await Hotel.find({ location });
//     res.status(200).json(hotels);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Book hotel room
exports.bookHotel = async (req, res) => {
  const { hotelName, roomNumber, travelerCount, price } = req.body;

  try {
    const booking = new Booking({
      bookingType: 'hotel', from: hotelName, travelerCount, roomNumber, price
    });
    await booking.save();

    // Update available rooms
    await Hotel.updateOne({ hotelName }, { $inc: { availableRooms: -1 } });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
