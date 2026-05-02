require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userController = require('./controllers/userController');
const questionController = require('./controllers/questionController');

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:80'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (for Docker)
app.get('/actuator/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Routes
app.get('/api/users', userController.getUsers);
app.post('/api/submit-questions', questionController.submitQuestions);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Виникла помилка при обробці запиту'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
