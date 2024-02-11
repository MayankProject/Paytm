const express = require('express')
const indexRouter = require('./routes')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())

app.use('/api', indexRouter)

app.listen(3000, ()=>{
    console.log('Server running on whatever port you given, fucker!')
})