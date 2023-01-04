import { logError } from '@middleware/error-handling/log-error';
import { productRoute } from '@routes/products/product';
import bodyParser from 'body-parser';
import express from 'express';

//create app
export const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//routes
app.use('/products', productRoute);

app.use(logError);
