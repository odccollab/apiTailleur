import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/mongodb.js';
import postRoute from './router/PostRoute.js';
import userRoute from './router/UserRoute.js';
import dotenv from 'dotenv';
import swaggerSetup from './swagger.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
swaggerSetup(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json());
app.use("/posts", postRoute);
app.use("/users", userRoute);

const PORT = process.env.PORT || 3000;
server.listen(80, () => {
    console.log(`Server is running on port ${PORT}`);
});
