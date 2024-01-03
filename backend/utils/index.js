// packages
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// utils
import connectDB from '../config/db.js';

dotenv.config()

connectDB();

const port = process.env.VITE_PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => [
    res.send(`Hello World`)
])

app.listen(port, () => console.log(`Server running on port ${port}`))