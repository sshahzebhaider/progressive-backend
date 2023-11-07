import asyncHandler from 'express-async-handler';
import Product from '../Models/productsModel.js';
import Employee from '../Models/employeeModel.js';
import NewStock from '../Models/newStockModel.js';
import Expense from '../Models/expenseModel.js';
import generateToken from '../utils/generateToken.js';
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });
  if (employee && password === employee.password) {
    res.json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      isAdmin: employee.isAdmin,
      password: employee.password,
      token: generateToken(employee._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const updateEmployeeProfile = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(StaticRange.NOT_FOUND);
    throw new Error('User not found');
  }
});

const addNewStock = async (req, res) => {
  const products = req.body;
  const employee = req.user;

  try {
    const newStockData = {
      productsName: products.map((product) => product.name),
      employeeName: employee.name,
      employeeEmail: employee.email,
      employeeId: employee._id,
      productID: products.map((product) => product.productId),
      newStock: products.map((product) => product.newStock),
    };
    const newStock = await NewStock.create(newStockData);

    // Update Product model with new stock information
    for (const product of products) {
      const { productId, newStock } = product;

      const foundProduct = await Product.findById(productId);

      if (foundProduct) {
        const previousStock =
          foundProduct.previousStock + foundProduct.newStock;
        const updatedTotalStock = foundProduct.totalStock + newStock;

        await Product.findByIdAndUpdate(productId, {
          previousStock: previousStock,
          newStock: newStock,
          totalStock: updatedTotalStock,
        });
      } else {
        // console.log('Product not found');
      }
    }

    res.status(200).json({ newStock });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add new stock' });
  }
};

const addExpense = asyncHandler(async (req, res) => {
  const { expenseName, description, amount } = req.body;
  const { _id: employeeId, name: employeeName } = req.user;

  try {
    const newExpense = new Expense({
      expenseName,
      description,
      amount,
      employeeName,
      employeeId: employeeId.toString(), // Converting to String if 'employeeId' is an ObjectId
    });

    const createdExpense = await newExpense.save();

    res.status(201).json(createdExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Expense creation failed', error: error.message });
  }
});

export { authUser, updateEmployeeProfile, addNewStock, addExpense };
