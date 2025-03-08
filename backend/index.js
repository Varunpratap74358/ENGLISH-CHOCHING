import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import adminRouter from './routes/adminRoute.js'
import eventRoute from './routes/eventRoute.js'
import courseRoute from './routes/courseRoute.js'

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    method: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log(err));

//api
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/event",eventRoute)
app.use("/api/v1/course",courseRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
