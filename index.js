const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');
dotenv.config();
const port = 5000;
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected ${conn.connection.host}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
const app = express();
app.use(
    cors({
        origin: 'https://mini-profile.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/auth/', router);
connectDb()
    .then((result) => {
        return app.listen(port, () => { console.log(`The server is up and running on port ${port}`) })
    })
    .catch((error) => { console.log(error); return error });
app.get('/', (req, res) => {
    res.send("Hello World");
});
