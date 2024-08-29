const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const bookingRoute = require('./routes/bookingRoutes');

connectDB();
app.use(cors());

app.use(express.json());
app.use('/user', userRoute);
app.use('/booking', bookingRoute);


app.get('/', (req, res) => {
    res.send('Travel app backend start');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
