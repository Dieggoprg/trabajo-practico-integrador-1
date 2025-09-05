import { validationResult } from "express-validator";

const applyValidations = (req, res, next) => {
  const result = validationResult(req);
  
  // 1. Errores como array
  console.log(result.array());

  // 2. Errores mapeados por campo
  console.log(result.mapped());

  // 3. Errores formateados personalizados
  const custom = result.formatWith((err) => {
    return `${err.param}: ${err.msg}`;
  });
  console.log(custom.array());
  // 4. También podrías hacer result.throw()

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  next();
};

export default applyValidations;
