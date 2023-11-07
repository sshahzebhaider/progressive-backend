import mongoose from 'mongoose';

const soldProductSchema = new mongoose.Schema(
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
    quantities: [{ type: Number, required: true }],
  },
  {
    timestamps: true,
  }
);

const SoldProducts = mongoose.model('SoldProduct', soldProductSchema);

export default SoldProducts;
