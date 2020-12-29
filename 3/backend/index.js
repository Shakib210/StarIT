import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import BookRoute from './routes/BookRoute.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/books',BookRoute)


  app.get('/', (req, res) => {
    res.send('API is running....')
  })


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
)
