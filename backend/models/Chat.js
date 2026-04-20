import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Chat", chatSchema);