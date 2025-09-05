import { matchedData } from "express-validator";

export const dataValidada = async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }
    req.data = data;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const ownerMiddleware = (req, res, next) => {
  try {
    const userId = req.user?.id;
    const articleOwnerId = req.article?.user_id;

    if (userId !== articleOwnerId) {
      return res.status(403).json({ message: "No tienes permisos para modificar este artículo" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
