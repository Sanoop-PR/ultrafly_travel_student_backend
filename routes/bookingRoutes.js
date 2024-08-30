const express = require('express');
const { allNotApprovedBooking, bookFlight, bookBus ,bookHotel,bookTrain,getFlight,getFlightById,getTrain,getBus,getHomeHotel ,getBookingById,getTrainById,getBusById,approveBooking} = require('../controller/bookingController');
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
router.post('/hotel/getHomeHotel', getHomeHotel);
router.post('/hotel/book', bookHotel);


// bus
router.post('/bus/book', bookBus);
router.post('/bus/get', getBus);
router.get('/bus/get/:id', getBusById);


router.get('/getBookingById/get/:id', getBookingById);

// admin
router.get('/allNotApprovedBooking/get', allNotApprovedBooking);

router.put('/approve/:id', approveBooking);


module.exports = router;
