const express = require('express');
const { allBooking, bookFlight, bookBus ,bookHotel,bookTrain,getFlight,getFlightById,getTrain,getBus,getHotel ,getBookingById,getTrainById,getBusById} = require('../controller/bookingController');
const router = express.Router();

// flight
router.post('/flight/book', bookFlight);
router.post('/flight/get', getFlight);
router.get('/flight/get/:id', getFlightById);

// train
router.post('/train/book', bookTrain);
router.post('/train/get', getTrain);
router.get('/train/get/:id', getTrainById);



// hotel
// router.post('/hotel/book', bookHotel);
router.get('/hotel/get', getHotel);


// bus
router.post('/bus/book', bookBus);
router.post('/bus/get', getBus);
router.get('/bus/get/:id', getBusById);


router.get('/getBookingById/get/:id', getBookingById);



module.exports = router;
