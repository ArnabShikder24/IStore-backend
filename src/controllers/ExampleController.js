const db = require("../database/db");

exports.example = (req, res) => {
    const query = "SELECT * FROM products";
    db.query(query, (err, data) => {
        res.json({data: data})
    })
}


