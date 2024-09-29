import mongoose from "mongoose";
import { HotelType } from "../shared/types";

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Single, Double, Suite
  capacity: { type: Number, required: true }, // Max capacity for people
  pricePerNight: { type: Number, required: true },
  imageUrls: { type: [String], required: true }, // Array of image URLs
  availableRooms: { type: Number, required: true },
  description: { type: String }, // Optional description
});

const hotelSchema = new mongoose.Schema<HotelType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    country: { type: String, required: true },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true }, // GeoJSON coordinates
    },
    description: { type: String, required: true },
    roomTypes: [roomSchema], // Embed RoomType array using roomSchema
    type: { type: String, required: true }, // e.g. Hotel, Motel, Resort
    maxAdultCount: { type: Number, required: true },
    maxChildCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    starRating: { type: Number, required: true, min: 1, max: 5 },
    lastUpdated: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Available", "Booked", "Under Maintenance"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
