import mongoose from "mongoose";

const interestedStudentSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  course: {
    type: String,
    required: true,
  },
});

const InterestedStudent = mongoose.model(
  "interestedstudent",
  interestedStudentSchema
);
export default InterestedStudent;
