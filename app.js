import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/mongodb.js';
import postRoute from './router/PostRoute.js';
import userRoute from './router/UserRoute.js';
import partageRoute from './router/PartageRoute.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());
connectDB;

app.use(express.json());
// app.use("/posts",postRoute);
app.use("/users",userRoute);
app.use("/partage",partageRoute);

// Pour démarrer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

