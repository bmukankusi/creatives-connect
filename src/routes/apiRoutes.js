const express = require('express');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes'); 

const API = express.Router();

API.use('/users', userRoutes);
API.use('/admin', adminRoutes);

module.exports = API;
