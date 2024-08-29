
const express = require('express');
const { register, login ,getUser} = require('../controller/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getUser/:email', getUser);

module.exports = router;
