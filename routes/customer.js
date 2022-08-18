const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)
connection.connect(function (error) {
    if (error){
        console.log(error)
    }else {
        console.log('connected to the MySQL server.')
        var userTable = "CREATE TABLE IF NOT EXISTS Customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), username VARCHAR(255))"
        connection.query(userTable, function (error, result){
            if (error) throw error;
            if (result.warningCount === 0){
                console.log('customer table created!');
            }
        })
    }
})

const router = express.Router()

router.get('/',(req,res)=>{
    res.send('get request came from customer')
})

router.get('/customer_name',(req,res)=>{
    res.send('get request came from customer_name')
})

router.get('/:id',(req,res)=>{
    res.send('get user id')
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

module.exports = router