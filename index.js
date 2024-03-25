import express from "express"
import router from "./routes/index.js";
import connectToDb from "./db/index.js";import dotenv from "dotenv"

const app = express();
const PORT = 4000;

dotenv.config()
app.use(express.json());
app.use(router)
connectToDb()

app.listen(PORT , () => {
    console.log("App is running in http://localhost:4000");
})
