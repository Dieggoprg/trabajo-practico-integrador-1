import { UserModel } from "../models/user.model.js"
import { ProfileModel } from "../models/profile.model.js"
import { ArticleModel } from "../models/article.model.js"

export const getAllUser = async (req , res) => {
    try {
        const users = await UserModel.findAll({
            attributes: {exclude : ["password"]},
            include:{
                model: ProfileModel,
                as: "profile"
            }
        })
       res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "error interno del servidor..."})
    }
}

export const getUserByPk = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await UserModel.findByPk(id, {
            attributes: {exclude: ["password"]},
            include: [{
                model: ProfileModel,
                as: "Profile"
            },{
                model: ArticleModel,
                as: "articles"
            }]
        })

        if (!user) {
            res.status(404).json("Usuario no encontrado")
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json("Error interno del servidor")
    }
}