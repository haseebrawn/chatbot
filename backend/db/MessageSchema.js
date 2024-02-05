import mongoose from "mongoose";

mongoose.connect(
    process.env.databaseUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

// Schema for user Chat
const chatDataSchema = new mongoose.Schema({
    query: [
      {
        type: String,
      },
    ],
    response: String,
    // username: { type: String, required: true },
    user_id: {
      type: String,
      required:true
    },
    email: String,
    date: Date,
  });
  const MessageSchema = mongoose.model("message", chatDataSchema);

  export default MessageSchema;