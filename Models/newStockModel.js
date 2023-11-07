import mongoose from 'mongoose';

const newStockSchema = new mongoose.Schema(
  {
    productsName: [{ type: String, required: true }],
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    employeeId: { type: String, required: true },
    productID: [
      {
        type: String,
        required: true,
      },
    ],
    newStock: [{ type: Number, required: true }],
  },
  {
    timestamps: true,
  }
);

const NewStock = mongoose.model('New Stock', newStockSchema);

export default NewStock;
