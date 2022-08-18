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
    connection.query(query, [name,username,id], (error,rows) =>{
        if (error) throw error

        if (rows.affectedRows >0){
            res.send({"message" : "customer updated"})
        }else {
            res.send({"message" : "no such customer"})
        }
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    var query = "DELETE FROM Customer WHERE id=?";

    connection.query(query, [id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'user deleted' })
        } else {
            res.send({ 'message': 'user not found' })
        }
    })
})

router.post('/',(req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const username = req.body.username
    var query = "INSERT INTO Customer(id, name,username) VALUES (?,?,?)"
    connection.query(query, [id,name,username], (error) =>{
        if (error){
            res.send({"message" : "duplicate entry"})
        }else {
            res.send({"message" : "customer added"})
        }
    })
})

router.get('/:id',(req,res)=>{
    const  id = req.params.id
    const query = "SELECT * FROM Customer WHERE id=?";
    connection.query(query,[id],(error, rows) => {
        if(error) console.log(error);
        res.send(rows)
    })
})

module.exports = router