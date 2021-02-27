const express = require('express')
const {AddItem} = require("../controllers/item-controller");
const {Items} = require("../controllers/item-controller");
const {Login, SignUp, AllUsers, Uplaod, UplaodWithData} = require("../controllers/user-controller");

const router = express.Router();

router.post('/login', Login)
router.post('/signup', SignUp)
router.get('/users', AllUsers)
router.post('/upload', Uplaod)
router.post('/uploadwithdata', UplaodWithData)
router.post('/additem', AddItem)
router.get('/items', Items)

module.exports = router

