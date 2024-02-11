const User = require("../db/schemas")
const express = require("express")
const { signUpSchema, signInSchema } = require("../formSchema")
const jwt = require("jsonwebtoken")
const { authenticationCheck } = require("../middlewares")
const { default: mongoose } = require("mongoose")
const router = express.Router()

require('dotenv').config()

const JwtPass = process.env.JWT_PASS

router.get('/', function(req, res) {
    return res.json({
        message: "Hello World!"
    })
})

router.post('/signup', async function(req, res) {
    let parsedData = signUpSchema.safeParse(req.body)
    if (!parsedData.success) return res.status(400).json({message: 'Invalid Input!'})
    const user = await User.create(parsedData.data)
    if (user) {
        const payload = {
            email: parsedData.data.email,
            firstName: parsedData.data.firstName,
            time: new Date(),
        } 
        const token = jwt.sign(payload, JwtPass)

        return res.status(200).json({token})
    }
    
    return res.status(500).json({
        message: 'Internal Server Error!'
    })
    
})

router.post('/signin', async function(req, res) {

    let parsedData = signInSchema.safeParse(req.body)
    if (!parsedData.success) return res.status(400).json({message: 'Invalid Input!'})

    const find = await User.findOne(parsedData.data)
    if (!find) return res.status(401).json({message: 'Invalid Credentials!'})

    const payload = {
        email: find.email,
        firstName: find.firstName,
        time: new Date(),
    }

    const token = jwt.sign(payload, JwtPass)

    return res.status(200).json({token})
})

router.get('/balance', authenticationCheck, async function(req, res){
    return res.json({balance: req.user.balance})
})

router.get('/sessionData', authenticationCheck, async (req, res)=>{
    const {firstName, lastName, _id, balance} = req.user
    return res.json({_id, firstName, lastName, balance})
})

router.get('/users', authenticationCheck, async (req, res)=>{
    const allUser = await User.find({ _id: { $ne: req.user._id } }, 'firstName lastName _id')
    return res.json(allUser)
})

router.get('/users/search/:query', authenticationCheck, async (req, res)=>{
    const query = (req.params.query).toLowerCase()
    const allUser = await User.find({ _id: { $ne: req.user._id } }, 'firstName lastName _id')
    let filteredUsersArr = Array()
    allUser.forEach((user)=>{
        if ((user.firstName).toLowerCase().includes(query) || (user.lastName).toLowerCase().includes(query)) {
            filteredUsersArr.push(user)
        }
    })
    return res.json(filteredUsersArr)
})

router.get('/users/:id', async (req, res)=>{
    const id = req.params.id 
    try{
        const user = await User.findById(id).select('firstName')
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({message: "Bad Request!"})
    }
})

router.post('/transact', authenticationCheck, async (req, res)=>{
    const {to, amount} = req.body
    const user = req.user
    const session = await mongoose.startSession()
    const reciever = await User.findById(to)
    
    session.startTransaction()
    if (user.balance<amount) {
        session.abortTransaction()
        return res.status(401).json({
            message: 'Insufficient balance!'
        })
    }

    if (!reciever) {
        session.abortTransaction()
        return res.status(401).json({
            message: 'Invalid Request!'
        })
    }

    try{
        await reciever.updateOne({$inc: {balance: amount}}).session(session)
        await user.updateOne({$inc: {balance: -amount}}).session(session)

        await session.commitTransaction()
        session.endSession()
        
        return res.status(200).json({message: "Transaction Done!"})
    }

    catch(err){
        await session.abortTransaction()
        session.endSession()
        return res.status(500).json({message: "Transaction Aborted!"})
    }

})


module.exports = router