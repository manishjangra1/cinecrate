import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/router.js";

//configurations
dotenv.config();

//constants
const PORT = process.env.PORT || 9000;

//initialize
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

connectDB();

//routes
app.use(router);

//server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
