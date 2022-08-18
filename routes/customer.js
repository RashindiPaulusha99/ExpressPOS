const express = require('express')
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
    res.send('post request came from customer')
})

module.exports = router