import mongoose from "mongoose";
console.log("url=",process.env.databaseUri)
mongoose.connect(
   process.env.databaseUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  // schema for User DataSave
  const DataSchema = new mongoose.Schema({
    username: String,
    email: String,
    message: String,
    date: Date,
  });
  const Data = mongoose.model("Data", DataSchema);

  export default Data; 