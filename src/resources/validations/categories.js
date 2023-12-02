const Joi = require('joi');


const categoriesValidator = Joi.object({
    title : Joi.string().required(),
    description: Joi.string().required(),
    slug: Joi.string().required(),
})

module.exports = categoriesValidator