const db = require("../database/db");

exports.createOrder = (req, res) => {
    const { user_id, product_id, quantity, subtotal, email } = req.body;

    const sqlSearch = `SELECT COUNT(*) AS total from \`order\` WHERE email='${email}' and product_id='${product_id}'`;
    db.query(sqlSearch, (err, result) => {
        if (result[0].total > 0) {
            return res.json({ message: "Product already exist you can't add it again" });
        }
        else {
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
        }
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

exports.updateOrderQuantity = (req, res) => {
    const { quantity, order_id, email, subtotal } = req.body;

    const sql = `UPDATE \`order\` SET quantity = ${quantity}, subtotal = ${subtotal} WHERE order_id = ${order_id} AND email = '${email}'`;
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error updating order quantity:", err);
            return res.status(500).json({ message: "Failed to update order quantity" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found for the specified email" });
        }

        console.log("Order quantity updated successfully");
        res.status(200).json({ message: `Order quantity updated successfully, changeId: ${randomNumber}` });
    });
};

exports.deleteOrderByemailandid = (req, res) => {
    const { order_id, email } = req.body;

    const sql = `DELETE FROM \`order\` WHERE order_id = ${order_id} AND email ='${email}'`;
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error deleting order:", err);
            return res.status(500).json({ message: "Failed to delete order" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found for the specified email and order ID" });
        }

        console.log("Order deleted successfully");
        res.status(200).json({ message: `Order deleted successfully, deleteID= ${randomNumber}` });
    });
};
