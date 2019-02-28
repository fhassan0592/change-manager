import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    app.listen(process.env.PORT, () => {
        console.log(`API is live on ${ process.env.PORT }`);
    });
});