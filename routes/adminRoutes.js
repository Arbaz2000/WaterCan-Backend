const express = require('express');
const { signup, login, getUsers, deleteUser, adminforgotPassword } = require('../controllers/superAdmin');
const router = express.Router();

router.post("/Signup",signup)
router.post("/Login",login)
router.patch("/getUser",getUsers)
router.delete("/deleteUser/:id",deleteUser)
router.post("/changePassword",adminforgotPassword)


module.exports=router;