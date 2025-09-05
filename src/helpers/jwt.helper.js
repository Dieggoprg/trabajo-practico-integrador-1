import "dotenv/config";
import jwt from "jsonwebtoken";
// Generar token JWT
export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token válido por 1 hora
    });
  } catch (error) {
    throw new Error("Error al generar el token: " + error.message);
  }
};
// Verificar token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error al verificar el token: " + error.message);
  }
};
