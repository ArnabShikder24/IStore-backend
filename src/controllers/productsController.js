const db = require("../database/db");

exports.createProduct = (req, res) => {
    const { title, price, quantity, img, category, color, description } = req.body;

    if (!title || !price || !quantity) {
        return res.status(400).json({ message: "Title, price, and quantity are required fields" });
    }

    const sql = `INSERT INTO products (title, price, quantity, img, category, color, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, price, quantity, img, category, color, description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error creating product:", err);
            return res.status(500).json({ message: "Failed to create product" });
        }

        console.log("Product created successfully");
        res.status(201).json({ message: "Product created successfully", product_id: result.insertId });
    });
};

exports.getAllProducts = (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ message: "Failed to fetch products" });
        }

        res.status(200).json({message: "Product fetch Successfully", data: result});
    });
};

exports.getProductById = (req, res) => {
    const { product_id } = req.query;

    const sql = `SELECT * FROM products WHERE product_id = ${product_id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({ message: "Failed to fetch product" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product fetched successfully", data: result[0] });
    });
};