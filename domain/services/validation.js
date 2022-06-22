const joi = require("joi");
const registerValidation = (data) => {
const validation = joi.object({
     Name: joi.string().min(3).max(25).required(),
     Username: joi.string().alphanum().min(3).max(25).trim(true).required(),
     Email: joi.string().email().trim(true).required(),
     Password: joi.string().min(8).trim(true).required(),
     DOB: joi.date()
.default([]),
    is_active: joi.boolean().default(true),
});
return validation.validate(data)
}

module.exports = {registerValidation};