import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const express = require('express')
const app = express()
const PORT = 1337
require('dotenv').config()

//https://chat.openai.com/api/auth/session

//middleware
app.use(express.json())
app.use(express.static('public'))

//Init chatgpt
const api = new ChatGPTUnofficialProxyAPI({ accessToken: process.env.ACCESS_TOKEN })

//routes
app.post('/chat', async (req, res) => {
    const { message } = req.body
    if (!message) {
        res.sendStatus(400)
    }
    console.log(message)
    let chatResponse = await api.sendMessage(message)
    res.status(200).send({ "response": chatResponse.text })
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))