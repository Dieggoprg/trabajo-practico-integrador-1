import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TagsModel = sequelize.define("Tags", {
    name : {type:DataTypes.STRING({min:2, max:30}), unique: true, allowNull: false}
})