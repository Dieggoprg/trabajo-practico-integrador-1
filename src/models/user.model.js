import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ProfileModel } from "./profile.model.js";

export const UserModel = sequelize.define("Users", {
    username : {type: DataTypes.STRING({min:3 , max:20}), unique: true,allowNull: false},
    email : {type: DataTypes.STRING(100), unique: true, allowNull: false},
    password : {type: DataTypes.STRING(225), allowNull: false},
    role : {type: DataTypes.ENUM("user", "admin")}
})

//RELACION 1:1   ---  UN USUARIO TIENE UN PERFIL
UserModel.belongsTo(ProfileModel, {foreignKey: "profile_id", as: "profile"});

ProfileModel.hasOne(UserModel, {foreignKey: "profile_id"})