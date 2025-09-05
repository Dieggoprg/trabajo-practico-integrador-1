import { UserModel } from "../models/user.model.js"
import { ProfileModel } from "../models/profile.model.js"
import { ArticleModel } from "../models/article.model.js"

export const createUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);  
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message: "error interno del servidor..."})
    }   
}

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

export const updateUser = async (req, res) => {
    const {id} = req.params;
    try {
        const data = req.data;                  
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({message: "Usuario no encontrado"})
        }
        await user.update(data);

        return res.status(200).json({message: "Usuario actualizado", user}) 
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"})
    }       
}
export const deleteUser = async (req, res) => {
    const {id} = req.params;        
    try {
        const deleted = await UserModel.destroy({where: {id}});
        if (!deleted) {
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        return res.status(200).json({message: "Usuario eliminado"})
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"})
    }   
}

