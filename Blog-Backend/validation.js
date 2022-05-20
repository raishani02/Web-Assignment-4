//Validation
const Joi = require('@hapi/joi');

//we will make a schema for joi
// so that it will cross check all things one by one

const regsitration_schema = {
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
};

const registration_validation = data =>
{
    return Joi.validate(data, regsitration_schema);
}

module.exports.registration_validation = registration_validation