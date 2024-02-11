const db = require("../database/db");

exports.createOrder = (req, res) => {
    const { user_id, product_id, quantity, subtotal, email } = req.body;

    if (!user_id || !product_id || !quantity || !subtotal || !email) {
        return res.status(400).json({ message: "user_id, product_id, quantity, subtotal, and email are required fields" });
    }

    const sql = `INSERT INTO \`order\` (user_id, product_id, quantity, subtotal, email) VALUES (${user_id}, ${product_id}, ${quantity}, ${subtotal}, '${email}')`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error creating order:", err);
            return res.status(500).json({ message: "Failed to create order" });
        }

        console.log("Order created successfully");
        res.status(201).json({ message: "Order created successfully", order_id: result.insertId });
    });
};

exports.getOrdersByEmail = (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email parameter is required" });
    }

    const sql = `SELECT * FROM \`order\` WHERE email = ?`;
    const values = [email];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error fetching orders by email:", err);
            return res.status(500).json({ message: "Failed to fetch orders" });
        }

        console.log("Orders fetched successfully");
        res.status(200).json({message: "Orders fetched successfully", data: results});
    });
};

exports.getAllOrders = (req, res) => {
    const sql = "SELECT * FROM `order`";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Failed to fetch orders" });
        }

        console.log("Orders fetched successfully");
        res.status(200).json({message: "Orders fetched successfully", data: results});
    });
};
