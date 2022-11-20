import express from "express";
import { startDatabase } from "./db/index"

//create app 
const app = express();
startDatabase();

//listen to app
app.listen(3000, "localhost", () => {
    console.log("server started")
});