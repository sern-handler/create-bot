import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({ 
  user_id: { type: String, required: true},
});

export const warns = mongoose.model("warn", schema)
