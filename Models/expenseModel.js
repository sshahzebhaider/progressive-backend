import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    expenseName: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    employeeName: { type: String, required: true },
    employeeId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
