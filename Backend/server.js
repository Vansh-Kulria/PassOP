const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const PassOP = require('./models/PassOP')
app.use(express.json())
const port = 3000

// Connect to MongoDB
async function main() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err)
        })
}

main()
// Get all Password
app.get('/', async (req, res) => {
    try {
        const Passwords = await PassOP.find({})
        res.json(Passwords)
    } catch (err) {
        console.error('Error fetching passwords:', err)
        res.status(500).send('Internal Server Error')
    }
})
// save password
app.post('/', async (req, res) => {
    const passwordData = req.body
    const newPassword = new PassOP({
        website_url: passwordData.website_url,
        username: passwordData.username,
        password: passwordData.password,
        id: passwordData.id
    })
     await newPassword.save()
        .then(() => {
            res.status(201).send('Password saved successfully')
        })
        .catch(err => {
            console.error('Error saving password:', err)
            res.status(500).send('Internal Server Error' + err)
        })
})

app.delete('/', (req, res) => {
    const { id } = req.body
    PassOP.findOneAndDelete({ id: id })
        .then(() => {
            res.status(200).send('Password deleted successfully')
        })
        .catch(err => {
            console.error('Error deleting password:', err)
            res.status(500).send('Internal Server Error')
        })
        
})



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
