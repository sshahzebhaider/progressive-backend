import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import productRoutes from './Routes/productRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import employeeRoutes from './Routes/employeeRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandlerMiddleware.js';

import http from 'http';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);

const server = http.createServer(app);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(
  PORT,
  // console.log(
  //   `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  // )
);
