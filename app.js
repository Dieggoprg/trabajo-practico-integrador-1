import express from "express"
import { connectDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import {userRouter} from "./src/routes/user.routes.js";
import {articleRouter} from "./src/routes/article.routes.js";
import {tagRouter} from "./src/routes/tag.routes.js";
import {articleTagRouter} from "./src/routes/article_tag.routes.js";
import { authRoutes } from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/api", articleRouter);
app.use("/api", tagRouter);
app.use("/api", articleTagRouter);
app.use("/api", authRoutes);

app.use(express.json())

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log("SERVIDOR CORRIENDO CORRECTAMENTE EN EL PUERTO: ", PORT)
})
})









