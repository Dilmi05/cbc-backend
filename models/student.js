import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String
  })

  const student = mongoose.model("students",studentSchema);

  export default student;