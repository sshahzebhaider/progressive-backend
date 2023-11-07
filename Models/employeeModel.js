import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const employeeSchema = mongoose.Schema({
  isAdmin: { type: Boolean, default: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    default: uuidv4, // Using uuidv4 to generate a random ID by default
    required: true,
  },
  employed: { type: Date },
  role: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
