
const express = require('express');
const { register, login ,getUser,deleteUser,updateProfile} = require('../controller/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getUser/:email', getUser);
router.delete('/delete', deleteUser);
router.put('/updateProfile/:email', updateProfile);

module.exports = router;
