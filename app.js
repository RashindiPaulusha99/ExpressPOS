const express = require('express')
const customer = require('./routes/customer')
const app = express()
const port = 4000

app.use(express.json())
app.use('/customer',customer)

app.get('/', (req, res) => {
   console.log('get request coming!')
    res.send('get request coming for / route')
})

app.listen(port,()=>{
    console.log(`app listening on ${port}`)
})