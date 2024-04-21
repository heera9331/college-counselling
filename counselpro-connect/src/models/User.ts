import mongoose, { Document, Schema, Model } from "mongoose";
import { PiDotsThreeCircleVerticalDuotone } from "react-icons/pi";

// Interface for User document
interface UserDocument extends Document {
  name: string;
  isAdmin: boolean;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for User model
interface UserModel extends Model<UserDocument> {}

// Define schema
const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define and export User model
const User: UserModel =
  mongoose.models.user ||
  mongoose.model<UserDocument, UserModel>("user", userSchema);

export default User;
