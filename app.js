import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import taskRouter from './routes/task.js'
import userRouter from './routes/user.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://barista-task.netlify.app',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(express.json())

app.use('/task', taskRouter)
app.use('/user', userRouter)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to db')
  } catch (error) {
    console.error('Error connecting to db', error)
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  connectDB()
})
