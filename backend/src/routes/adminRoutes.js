
const express = require('express');
const { getAllUsers, createUser } = require('../controllers/adminController');
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/create', createUser);

module.exports = router;
