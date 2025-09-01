import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleModel = sequelize.define("Articles", {
    title: {type: DataTypes.STRING({min:3 , max:200}), allowNull: false},
    content: {type: DataTypes.TEXT({min:50}), allowNull: false},
    excerpt: {type: DataTypes.STRING(500)},
    status: {type: DataTypes.ENUM("published", "archived")}
})