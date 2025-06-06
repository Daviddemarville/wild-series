import type { RequestHandler } from "express";
import type Joi from "joi";

export default function validateBody(schema: Joi.ObjectSchema): RequestHandler {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((detail) => detail.message);
      res.status(400).json({ error: "Validation failed", details }); // 👈 On envoie, mais on ne retourne rien
    } else {
      req.body = value;
      next();
    }
  };
}
