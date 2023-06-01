/* eslint-disable no-console */
import { app } from './';
import { startDatabase } from './db/index';

const PORT = process.env.PORT;
startDatabase();
app.listen(PORT, () =>
    console.log(
        `Listening on port: ${process.env.PORT}, environment : ${process.env.NODE_ENV}, key: ${process.env.JWTSECRET} `
    )
);
