import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressSession from 'express-session';

import { logError } from '@middleware/error-handling/log-error';

import dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/${process.env.NODE_ENV}.env` });

import { productRoute, userRoute } from '@routes/index';

//create app
export const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE,OPTIONS'
    })
);
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }));

// parse application/json
app.use(json());

app.use(
    expressSession({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    })
);
/*
app.use(initialize());
app.use(session());
*/

//routes
app.use('/products', productRoute);
app.use('/users', userRoute);
//app.use;
app.use(logError);
