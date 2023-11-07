import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { employees } from './data/employees.js';
import { products } from './data/products.js';
import Employee from './Models/employeeModel.js';
import Product from './Models/productsModel.js';
import connectDb from './config/db.js';
dotenv.config();
connectDb();

const importData = async () => {
  try {
    for (const employee of employees) {
      const existingEmployee = await Employee.findOne({
        email: employee.email,
      });

      if (existingEmployee) {
        await Employee.updateOne({ email: employee.email }, employee);
      } else {
        // Insert a new doctor document
        await Employee.create(employee);
      }
    }

    for (const product of products) {
      const existingProduct = await Product.findOne({ name: product.name });

      if (existingProduct) {
        await Product.updateOne({ name: product.name }, product);
      } else {
        await Product.create(product);
      }
    }
    // console.log('Data imported!');
    process.exit();
  } catch (error) {
    // console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Employee.deleteMany();

    // console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    // console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
