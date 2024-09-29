import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/myHotelRoutes";
import hotelRoutes from "./routes/hotelRoutes";
import bookingRoutes from "./routes/myBookingRoutes";
import adminRouter from "./routes/verifyHotelRoutes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/my-hotels", myHotelRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/my-bookings", bookingRoutes);
// app.use("/api/admin", adminRouter);

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
