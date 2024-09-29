import { ObjectId } from "mongoose";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  status: "active" | "inactive" | "banned"; // user status
};

// RoomType Schema
export type RoomType = {
  _id: string;
  type: string; // Single, Double, Suite, etc.
  capacity: number; // Maximum capacity for people
  pricePerNight: number;
  imageUrls: string[];
  availableRooms: number;
  description?: string; // Optional description for each room type
};

// HotelType Schema
export type HotelType = {
  _id: string;
  userId: ObjectId;
  name: string;
  country: string;
  location: {
    type: string;
    coordinates: number[];
  };
  description: string;
  roomTypes: RoomType[]; // Embed RoomType array
  type: string;
  maxAdultCount: number;
  maxChildCount: number;
  facilities: string[];
  starRating: number;
  imageUrls: string[]; // Array of hotel image URLs
  lastUpdated: Date;
  status: string;
};

export type BookingType = {
  _id: string;
  userId: ObjectId; // User making the booking
  hotelId: ObjectId; // Hotel being booked
  roomTypeId: ObjectId; // Specific room type being booked
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  status: "pending" | "confirmed" | "canceled" | "completed"; // Booking status
  createdAt: Date;
  updatedAt?: Date;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
