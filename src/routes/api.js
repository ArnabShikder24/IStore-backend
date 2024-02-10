const express = require('express');
const router = express.Router();
const ExampleController = require('../controllers/ExampleController');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/productsController');

router.get("/example", ExampleController.example);
router.post("/user", UserController.create);
router.post("/product", ProductController.createProduct);
router.get("/product", ProductController.getAllProducts);

module.exports = router;
