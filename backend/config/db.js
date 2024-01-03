import mongoose from 'mongoose';

const connectDB = async () => {
  
    try {
        await mongoose.connect(process.env.VITE_MONGO_URL)
        console.log('Successfully connected to mongoDB');
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1)
    }
}

export default connectDB