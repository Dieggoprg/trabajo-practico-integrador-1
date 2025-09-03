import express from "express"
import { connectDB } from "./src/config/database.js";
import "dotenv/config";
import { ArticleModel } from "./src/models/article.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { TagsModel } from "./src/models/tag.model.js";
import { UserModel } from "./src/models/user.model.js";
import { ArticlesTags } from "./src/models/ArticlesTags.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log("SERVIDOR CORRIENDO CORRECTAMENTE EN EL PUERTO: ", PORT)
})
})









