import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const conn = mongoose.connect(`${process.env.DB_URL}`);
        console.log("Mongodb connected");
    } catch (err) {
        console.log(err?.message);
    }
}

export default connectDb;