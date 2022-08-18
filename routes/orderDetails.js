const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)
connection.connect(function (error) {
    if (error){
        console.log(error)
    }else {
        console.log('connected to the MySQL server.')
        var orderDetailsTable = "CREATE TABLE IF NOT EXISTS OrderDetails (orderId VARCHAR(255) REFERENCES Orders (orderId) ON DELETE CASCADE, code VARCHAR(255) REFERENCES Item (code) ON DELETE CASCADE, qty DOUBLE)"
        connection.query(orderDetailsTable, function (error, result){
            if (error) throw error;
            if (result.warningCount === 0){
                console.log('orderDetails table created!');
            }
        })
    }
})

const router = express.Router()

router.get('/',(req,res)=>{
    var query = "SELECT * FROM OrderDetails"
    connection.query(query,(error, rows) =>{
        if (error) throw error
        res.send(rows)
    })
})

router.put('/',(req,res)=>{
    const orderId = req.body.orderId
    const code = req.body.code
    const qty = req.body.qty
    var query = "UPDATE OrderDetails SET code=?, qty=? WHERE orderId=?"
    connection.query(query, [code,qty,orderId], (error,rows) =>{
        if (error) throw error

        if (rows.affectedRows >0){
            res.send({"message" : "orderDetails updated"})
        }else {
            res.send({"message" : "no such orderDetails"})
        }
    })
})

router.delete('/:orderId', (req, res) => {
    const orderId = req.params.orderId
    var query = "DELETE FROM OrderDetails WHERE orderId=?";

    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'orderDetails deleted' })
        } else {
            res.send({ 'message': 'orderDetails not found' })
        }
    })
})

router.post('/',(req,res)=>{
    const orderId = req.body.orderId
    const code = req.body.code
    const qty = req.body.qty
    var query = "INSERT INTO OrderDetails(orderId, code,qty) VALUES (?,?,?)"
    connection.query(query, [orderId,code,qty   ], (error) =>{
        if (error){
            res.send({"message" : "duplicate entry"})
        }else {
            res.send({"message" : "place order"})
        }
    })
})

router.get('/:orderId',(req,res)=>{
    const  orderId = req.params.orderId
    const query = "SELECT * FROM OrderDetails WHERE orderId=?";
    connection.query(query,[orderId],(error, rows) => {
        if(error) console.log(error);
        res.send(rows)
    })
})

module.exports = router