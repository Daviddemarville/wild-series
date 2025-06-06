import Joi from "joi";

// Schéma pour un programme (sans l'id car il est auto-incrémenté)
export const programSchema = Joi.object({
  title: Joi.string().max(255).required(),
  synopsis: Joi.string().required(),
  poster: Joi.string().uri().required(),
  country: Joi.string().max(100).required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  category_id: Joi.number().integer().positive().required(),
});

// Schéma pour une catégorie
export const categorySchema = Joi.object({
  name: Joi.string().max(255).required(),
});
