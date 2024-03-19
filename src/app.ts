import express from 'express'
import { router } from './routes/routes'
import { baseUrl } from './routes/routes'

export const app = express()

app.use(express.json())

app.get(`${baseUrl}/`, (req, res) =>
    res.send('Welcome to YouTube Comment Analysis API!'),
)

app.use(baseUrl, router)
