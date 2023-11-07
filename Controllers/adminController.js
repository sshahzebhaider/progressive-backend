import asyncHandler from 'express-async-handler';
import Product from '../Models/productsModel.js';
import Employee from '../Models/employeeModel.js';
import Expense from '../Models/expenseModel.js';
import generateToken from '../utils/generateToken.js';

const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});
  res.json(employees);
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    await employee.deleteOne();
    res.json({ message: 'Employee removed' });
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

const createEmployee = asyncHandler(async (req, res) => {
  const { isAdmin, name, email, employed, role } = req.body;
  const employee = new Employee({
    isAdmin,
    name,
    email,
    employed,
    role,
  });

  const createdEmployee = await employee.save();
  res.status(201).json(createdEmployee);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.password = req.body.password;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(StaticRange.NOT_FOUND);
    throw new Error('User not found');
  }
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.statusCode.NOT_FOUND;
    throw new Error('User not found');
  }
});

const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({});
  res.json(expenses);
});
export {
  getAllEmployees,
  deleteEmployee,
  createEmployee,
  updateEmployee,
  getEmployeeById,
  getAllExpenses,
};
