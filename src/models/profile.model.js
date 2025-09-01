import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define("Profiles",
    {
        first_name : {type: DataTypes.STRING, allowNull: false},
        last_name : {type: DataTypes.STRING, allowNull: false},
        biography : {type: DataTypes.TEXT},
        avatar_url : {type: DataTypes.STRING(255)},
        birth_date : {type: DataTypes.DATE}
    }
)