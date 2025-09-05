import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model";

export const getAllProfile = async ( req , res ) => {
    try {
        const profiles = await ProfileModel.findAll({
            include: {
                model: UserModel,
                as: "profile"
            }
        })
          res.status(200).json(profiles)

    } catch (error) {
        res.status(500).json({message: "Error al al encontrar Perfiles"})
    }
}

export const getProfileByPk = async ( req , res ) => {
    const {id} = req.params;
    try {
        const profileId = await ProfileModel.findByPk(id, {
            include: [{
                model: UserModel,
                as: "profile"
            }]
        })

        if (!profileId) {
            res.status(404).json("Perfil no encontrado")
        }

        res.status(200).json(profileId)

    } catch (error) {
        res.status(500).json("Error interno del servidor ")
    }
}