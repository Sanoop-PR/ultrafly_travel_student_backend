const User = require('../modals/userModel'); // Ensure this path is correct
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.register = async (req, res) => {
    const { username, password, email, contactNo } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ username, password, email, contactNo });
        await user.save();
        const token = generateToken(user._id);
        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.json({ message: 'User logged in successfully', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUser = async (req,res) =>{
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}