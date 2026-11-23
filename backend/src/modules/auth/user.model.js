import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    // E-mail já chega normalizado (minúsculo); o índice único protege também
    // contra cadastros simultâneos.
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 254 },
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true, autoCreate: false, autoIndex: false },
);

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
