import { validationResult } from "express-validator";
export default (req, res, next) => {
  const errors = validationResult(req);

  //View Error of Body
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, data: errors.array() });
  }

  return next();
};
