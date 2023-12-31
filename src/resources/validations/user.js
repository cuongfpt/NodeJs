const Joi = require('joi');

const signupUserVali = Joi.object({
    email: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})
const signinUserVali = Joi.object({
    email: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports = {signupUserVali, signinUserVali};