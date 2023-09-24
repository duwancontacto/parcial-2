import express from "express";
import cors from "cors";
import routes from "./Routes/index.js";
import { connectSequelize } from "./config/database.js";
import "./Model/index.js";

const app = express();

const port = process.env.PORT || 3005;

//Active Req.body
app.use(express.json({ extended: true }));
app.use(cors());

//Conect to Sequelize
connectSequelize();

//Routes
routes(app);

//Server Up
app.listen(port, (err) => {
  if (err) throw err;
  console.log(` > Server Listen in port: ${port} `);
});
