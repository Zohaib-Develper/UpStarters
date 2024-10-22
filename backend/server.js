const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
                
dotenv.config({ path: './config.env' });

// Replace the password in the database connection string
const DB = process.env.DATABASE_NAME.replace('<PASSWORD>', process.env.DATABASE_BASE_PASSWORD);

// Connect to MongoDB Atlas
mongoose.connect(DB)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY!");
  })
  .catch((err) => {
    console.error('Connection error', err);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is live on port ${port}`);
});