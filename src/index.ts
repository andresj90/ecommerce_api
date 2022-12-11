import express from 'express';
import { startDatabase } from './db/index';
import { productRoute } from '@routes/product';
import { logError } from '@middleware/error-handling/log-error';
import bodyParser from 'body-parser';

//create app
const app = express();
startDatabase();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//routes
app.use('/products', productRoute);

app.use(logError);
//listen to app
app.listen(3000, '127.0.0.1', () => {
  // eslint-disable-next-line no-console
  console.log(`Server started`);
});
