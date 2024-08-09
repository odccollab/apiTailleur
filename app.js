import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/mongodb.js';
import postRoute from './router/PostRoute.js';
import userRoute from './router/UserRoute.js';
import dotenv from 'dotenv';
<<<<<<< HEAD
=======
import http from 'http';
import userRoutes from './router/UserRoute.js';
import messageRoutes from './router/MessageRoute.js';
import setupSocket from './socket/socket.js';
import { Server } from 'socket.io';
>>>>>>> bf354c3 (fonctionnalité message et partage sur la nouvelle branche)

dotenv.config();
const app = express();
app.use(bodyParser.json());
connectDB;
<<<<<<< HEAD

=======
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
>>>>>>> bf354c3 (fonctionnalité message et partage sur la nouvelle branche)
app.use(express.json());
app.use("/posts",postRoute);
app.use("/users",userRoute);

<<<<<<< HEAD
=======

>>>>>>> bf354c3 (fonctionnalité message et partage sur la nouvelle branche)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

