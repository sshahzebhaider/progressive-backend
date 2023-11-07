import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    sale: { type: Number, required: true },
    remainingBalance: { type: Number, required: true },
    price: { type: Number, required: true },
    totalStock: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate totalStock before saving
productSchema.pre('save', function (next) {
  this.totalStock = this.previousStock + this.newStock;
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
