"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_1 = __importDefault(require("../models/hotel"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.put("/verify-hotel/:hotelId/status", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hotelId } = req.params;
        const user = yield user_1.default.findById(req.userId);
        // Check if the user is an admin
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        // Find the hotel and update its status
        const hotel = yield hotel_1.default.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        hotel.status = "ON";
        yield hotel.save();
        res.status(200).json({ message: "Hotel status updated to ON", hotel });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
exports.default = router;
//# sourceMappingURL=verify-hotel.js.map