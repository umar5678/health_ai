import mongoose, { Schema } from "mongoose";

const contactUsSchema = new Schema({
  fullName: {
    type: String,
  },
  email: { type: String },
  phone: { type: Number },
  services: { type: Array },
  message: { type: String },
});

export const ContactUs = mongoose.model("ContactUs", contactUsSchema);
