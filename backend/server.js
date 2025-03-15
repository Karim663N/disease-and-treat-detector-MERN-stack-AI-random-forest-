require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS package

const treatRoutes = require('./routes/treats');
const deseaseRoutes = require('./routes/deseases');

// express app
const app = express();

// ✅ Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend to access
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));

// Middleware to parse JSON
app.use(express.json());

// Middleware to show used requests in console
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/treats', treatRoutes);
app.use('/api/deseases', deseaseRoutes);

// Connect to DB
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
