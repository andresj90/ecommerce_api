/* eslint-disable no-console */
import { app } from './';
import { startDatabase } from './db/index';

const PORT = 3000;
startDatabase();
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
