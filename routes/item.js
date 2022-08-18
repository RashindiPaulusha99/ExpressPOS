const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)
connection.connect(function (error) {
    if (error){
        console.log(error)
    }else {
        console.log('connected to the MySQL server.')
        var itemTable = "CREATE TABLE IF NOT EXISTS Item (code VARCHAR(255) PRIMARY KEY, description VARCHAR(255), qtyOnHand DOUBLE )"
        connection.query(itemTable, function (error, result){
            if (error) throw error;
            if (result.warningCount === 0){
                console.log('item table created!');
            }
        })
    }
})

const router = express.Router()

router.get('/',(req,res)=>{
    var query = "SELECT * FROM Item"
    connection.query(query,(error, rows) =>{
        if (error) throw error
        res.send(rows)
    })
})

router.put('/',(req,res)=>{
    const code = req.body.code
    const description = req.body.description
    const qtyOnHand = req.body.qtyOnHand
    var query = "UPDATE Item SET description=?, qtyOnHand=? WHERE code=?"
    connection.query(query, [description,qtyOnHand,code], (error,rows) =>{
        if (error) throw error

        if (rows.affectedRows >0){
            res.send({"message" : "item updated"})
        }else {
            res.send({"message" : "no such item"})
        }
    })
})

router.delete('/:code', (req, res) => {
    const code = req.params.code
    var query = "DELETE FROM Item WHERE code=?";

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'item deleted' })
        } else {
            res.send({ 'message': 'item not found' })
        }
    })
})

router.post('/',(req,res)=>{
    const code = req.body.code
    const description = req.body.description
    const qtyOnHand = req.body.qtyOnHand
    var query = "INSERT INTO Item(code, description,qtyOnHand) VALUES (?,?,?)"
    connection.query(query, [code,description,qtyOnHand], (error) =>{
        if (error){
            res.send({"message" : "duplicate entry"})
        }else {
            res.send({"message" : "item added"})
        }
    })
})

router.get('/:code',(req,res)=>{
    const  code = req.params.code
    const query = "SELECT * FROM Item WHERE code=?";
    connection.query(query,[code],(error, rows) => {
        if(error) console.log(error);
        res.send(rows)
    })
})

module.exports = router