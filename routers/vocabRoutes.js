const express = require('express');
const vocabController = require('./../controllers/vocabController');

const router = express.Router();


router.get('/',vocabController.signup);


module.exports = router;