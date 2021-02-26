const express = require('express')
const {Login, SignUp, AllUsers,Uplaod} = require("../controllers/user-controller");

const router = express.Router();

router.post('/login', Login)
router.post('/signup',SignUp)
router.get('/users',AllUsers)
router.post('/upload',Uplaod)
module.exports=router

