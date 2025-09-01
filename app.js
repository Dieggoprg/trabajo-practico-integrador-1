import express from "express"
import { connectDB } from "./src/config/database.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log("SERVIDOR CORRIENDO CORRECTAMENTE EN EL PUERTO: ", PORT)
})
})









