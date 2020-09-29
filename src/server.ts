import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import dotenv from "dotenv";
import { productsRoutes } from "./drivers/http/routes/product";
import { establishConnection } from "./drivers/db/connection";

const compress = compression();
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(compress);
app.use(cors());

app.use("/products", productsRoutes());

dotenv.config({ path: path.resolve(__dirname, "../.env") });

establishConnection()
  .then((connection) => {
    connection.runMigrations().then(() => {
      app.listen(process.env.APP_PORT, () => {
        // eslint-disable-next-line
        console.log('Server is up listening on port:', process.env.APP_PORT);
      });    
    });
  })
  .catch();
