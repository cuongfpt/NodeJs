const Joi = require('joi');

const productValidator = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    desc: Joi.string().required(),
    price :Joi.string().required()
})

module.exports = productValidator