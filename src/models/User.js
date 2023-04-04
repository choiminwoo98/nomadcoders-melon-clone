import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, allowNull: true, unique: true },
    displayName: { type: String },
    kakaoId: { type: String, required: true, unique: true },
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
