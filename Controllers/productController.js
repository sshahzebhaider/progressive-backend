import asyncHandler from 'express-async-handler';
import Product from '../Models/productsModel.js';
import SoldProducts from '../Models/soldProductsModel.js';
import NewStock from '../Models/newStockModel.js';
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id, name, previousStock, newStock, sale, remainingBalance, price } =
    req.body;

  const product = await Product.findById(id);

  if (product) {
    (product.name = name),
      (product.price = price),
      (product.previousStock = previousStock),
      (product.newStock = newStock),
      (product.sale = sale),
      (product.remainingBalance = remainingBalance);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    previousStock: 0,
    newStock: 0,
    sale: 0,
    remainingBalance: 0,
    price: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const sellProducts = async (req, res) => {
  const productQuantities = req.body;
  const employee = req.user;
  // console.log(productQuantities);
  try {
    const soldProductsData = {
      productsName: productQuantities.map((product) => product.name),
      employeeName: employee.name,
      employeeEmail: employee.email,
      employeeId: employee._id,
      productID: productQuantities.map((product) => product.productId),
      quantities: productQuantities.map((product) => product.quantity),
    };

    const soldProduct = await SoldProducts.create(soldProductsData);

    for (const product of productQuantities) {
      const { productId, quantity } = product;

      const foundProduct = await Product.findById(productId);

      if (foundProduct) {
        const updatedTotalStock = foundProduct.totalStock - quantity;
        const updatedSale = foundProduct.sale + quantity;

        await Product.findByIdAndUpdate(productId, {
          totalStock: updatedTotalStock,
          sale: updatedSale,
        });
      } else {
        console.log('Product not found');
        // Handle the scenario where the product is not found
      }
    }

    res.status(200).json({ soldProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sell products' });
  }
};

const getAllSoldProducts = asyncHandler(async (req, res) => {
  const soldProducts = await SoldProducts.find({});
  res.json(soldProducts);
});
const getNewStock = asyncHandler(async (req, res) => {
  const newStock = await NewStock.find({});
  res.json(newStock);
});

export {
  getAllProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  sellProducts,
  getAllSoldProducts,
  getNewStock,
};
