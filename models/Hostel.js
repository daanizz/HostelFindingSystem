const hostelSchema = new mongoose.Schema({
    hostelID: { type: Number, required: true, unique: true }, // Explicit Hostel ID
    name: { type: String, required: true },
    monthlyRent: { type: Number, required: true },
    facilities: { type: [String], required: true }, // Array to store multiple facilities
    location: { 
        state: { type: String, required: true },
        district: { type: String, required: true },
        place: { type: String, required: true }
    },
    numberOfRooms: { type: Number, required: true },
});

module.exports = mongoose.model("Hostel", hostelSchema);