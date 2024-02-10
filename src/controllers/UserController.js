const db = require("../database/db");

exports.create = (req, res) => {
    const { first_name, last_name, phone, address, email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `INSERT INTO users (first_name, last_name, phone, address, email) VALUES ('${first_name}', '${last_name}', '${phone}', '${address}', '${email}')`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error creating user:", err);
            return res.status(500).json({ message: "Failed to create user" });
        }

        console.log("User created successfully");
        res.status(201).json({ message: "User created successfully", user_id: result.insertId });
    });
};
