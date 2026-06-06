import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { addPerson, getAllPeople } from "./queries.mjs";

const app = express()
app.use(cors())
app.use(express.json())

//adding user endpoint
app.post('/api/signup', async (req, res) => {
    const { name, email} = req.body

    try {
        const person = await addPerson(name, email)
        res.json({ success: true, person})
    }catch(e) {
        res.status(400).json({ success: false, error: error.message })
    }
})

//getting users enpoint
app.get('api/users', async(req, res) => {
    const users = await getAllPeople()
    res.json(users)
})

app.listen(3000, () => console.log('API running on localhost:3000'))