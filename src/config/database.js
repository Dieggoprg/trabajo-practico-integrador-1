import "dotenv/config"
import { Sequelize } from "sequelize" 

export const sequelize = new Sequelize(
    process.env.NAME_DB,
    process.env.USER_DB,
    process.env.PASSWORD_DB,
    {
        host : process.HOST_DB,
        dialect : process.env.DIALECT_DB
    }
)

export const connectDB = async () => {
    try {
        await sequelize.sync({force:true});
        console.log("BASE DE DATOS SINCONIZADA CORRECTAMENTE")
        await sequelize.authenticate();
        console.log("BASE DE DATOS AUTENTICADA CORRECTAMENTE")
    } catch (error) {
        console.log("error connecting the database to the server")
        
    }
}