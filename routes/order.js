const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)
connection.connect(function (error) {
    if (error){
        console.log(error)
    }else {
        console.log('connected to the MySQL server.')
        var orderTable = "CREATE TABLE IF NOT EXISTS Orders (orderId VARCHAR(255) PRIMARY KEY, cusId VARCHAR(255) REFERENCES Customer (id) ON DELETE CASCADE, cost DOUBLE)"
        connection.query(orderTable, function (error, result){
            if (error) throw error;
            if (result.warningCount === 0){
                console.log('order table created!');
            }
        })
    }
})

const router = express.Router()

router.get('/',(req,res)=>{
    var query = "SELECT * FROM Orders"
    connection.query(query,(error, rows) =>{
        if (error) throw error
        res.send(rows)
    })
})

router.put('/',(req,res)=>{
    const orderId = req.body.orderId
    const cusId = req.body.cusId
    const cost = req.body.cost
    var query = "UPDATE Orders SET cusId=?, cost=? WHERE orderId=?"
    connection.query(query, [cusId,cost,orderId], (error,rows) =>{
        if (error) throw error

        if (rows.affectedRows >0){
            res.send({"message" : "order updated"})
        }else {
            res.send({"message" : "no such order"})
        }
    })
})

router.delete('/:orderId', (req, res) => {
    const orderId = req.params.orderId
    var query = "DELETE FROM Orders WHERE orderId=?";

    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'order deleted' })
        } else {
            res.send({ 'message': 'order not found' })
        }
    })
})

router.post('/',(req,res)=>{
    const orderId = req.body.orderId
    const cusId = req.body.cusId
    const cost = req.body.cost
    var query = "INSERT INTO Orders(orderId, cusId,cost) VALUES (?,?,?)"
    connection.query(query, [orderId,cusId,cost], (error) =>{
        if (error){
            res.send({"message" : "duplicate entry"})
        }else {
            res.send({"message" : "place order"})
        }
    })
})

router.get('/:orderId',(req,res)=>{
    const  orderId = req.params.code
    const query = "SELECT * FROM Orders WHERE orderId=?";
    connection.query(query,[orderId],(error, rows) => {
        if(error) console.log(error);
        res.send(rows)
    })
})

module.exports = router