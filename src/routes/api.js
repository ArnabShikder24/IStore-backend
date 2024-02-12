const express = require('express');
const router = express.Router();
const ExampleController = require('../controllers/ExampleController');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/productsController');
const OrderController = require('../controllers/OrderController');

router.get("/example", ExampleController.example);

// User
router.post("/user", UserController.create);
router.get("/users", UserController.getAllUsers);
// Get user by email
router.get("/user", UserController.getUserByEmail);

router.post("/product", ProductController.createProduct);
router.get("/product", ProductController.getProductById);
router.get("/product", ProductController.getAllProducts);

router.post("/order", OrderController.createOrder);
router.post("/order/update", OrderController.updateOrderQuantity);
router.get("/order", OrderController.getOrdersByEmail);
router.get("/orders", OrderController.getAllOrders);

module.exports = router;
