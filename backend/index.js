// packages
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// utils
import connectDB from './config/db.js';

dotenv.config()

connectDB();

const port = process.env.VITE_PORT || 5000

const __dirname = path.resolve()
const __direname = path.resolve()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send({clientId: process.env.VITE_PAYPAL_CLIENT_ID})
})

app.use('/uploads', express.static(path.join(__dirname + '/uploads')))
app.use(express.static(path.join(__direname + '/frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__direname, 'frontend', 'dist', 'index.html'))
})

app.listen(port, () => console.log(`Server running on port ${port}`))