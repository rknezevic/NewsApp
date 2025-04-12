const express = require('express')
const router = express.Router();
const {authMiddleware, permissionCheck} = require('../BusinessLogic/authMiddleware')
const {createNewsPost} = require ('../Controllers/NewsPostController')

router.post('/create', authMiddleware, permissionCheck('admin', 'editor'), createNewsPost);

module.exports = router;