const express = require('express')
const app = express()
const port = 4000

app.use(express.json())

app.get('/', (req, res) => {
   console.log('get request coming!')
    res.send('get request coming for / route')
})

app.get('/customer',(req,res)=>{
    console.log('get request coming from customer! ')
    res.send('customer get request coming for /customer route')
})

app.post('/customer',(req,res)=>{
    console.log('post request coming from customer! ')
    console.log(req.body)
    res.send('customer post request coming for /customer route')
})

app.listen(port,()=>{
    console.log(`app listening on ${port}`)
})