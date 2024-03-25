import mongoose from "mongoose";

const url = "mongodb+srv://vinhthanh89:P%40ssw0rd@cluster0.8twozai.mongodb.net/web77-midtest"

const connectToDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("Database connect successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectToDb