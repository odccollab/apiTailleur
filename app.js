import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/mongodb.js';
import postRoute from './router/PostRoute.js';
import userRoute from './router/UserRoute.js';
import dotenv from 'dotenv';
import './middlewares/cront.js';
import swaggerSetup from './swagger.js'


import userRoutes from './router/UserRoute.js';
// import messageRoutes from './router/MessageRoute.js';
// import setupSocket from './socket/socket.js';


dotenv.config();
const app = express();
swaggerSetup(app)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectDB;



app.use(express.json());
app.use("/posts",postRoute);
app.use("/users",userRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

