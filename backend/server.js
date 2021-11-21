// * Imports ================================================= //
import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
// * ========================================================= //
import router from "./routes.js";

import connectToMongoDb from "./configs/db/mongoDB.js";

const app = express();
const port = 5000;
// * ========================================================= //

// * cors
app.use(cors());

// * parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// * parse application/json
app.use(bodyParser.json());

// *express file upload
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

// * Mongodb Connection
connectToMongoDb();

// * routes
console.log("\x1b[36m", "Routes initializing");
app.use("/api/", router);

app.listen(port, () => {
  console.log(`\x1b[33m` + `Example app listening at http://localhost:${port}`);
});
