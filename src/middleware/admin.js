// src/middleware/admin.js
const { User }= require('../models/userModel');
 const admin= async (req,res, next)=>{
  console.log(req.user.userId)
     const currentUser= await User.findById( req.user.userId );

  if (!currentUser.isAdmin) return res.status(403).send('Access denied.');
  next();
 }
 module.exports = admin