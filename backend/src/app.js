import express from 'express'
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js'
import enrollmentRoutes from  './routes/enrollmentRoutes.js'
import dashboardRoutes from  './routes/dashboardRoutes.js'

import errorHandler from './middleware/errorHandler.js'

const app = express();

app.use(express.json());
app.use(cors());

// Base Route / Health Check
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Course Management API is running..." });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Catch-All for Undefined Routes (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use(errorHandler);

export default app;