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
