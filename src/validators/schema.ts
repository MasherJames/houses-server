import Joi from 'joi';

const userRegisterSchema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(15)
        .required(),
});

const userSchemaLogin = Joi.object().keys({
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(15)
        .required(),
    email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
});

const propertySchema = Joi.object().keys({
    price: Joi.number()
        .min(10)
        .max(100000),
    state: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    type: Joi.string()
        .min(6)
        .max(15)
        .required(),
    imageurl: Joi.string()
        .alphanum()
        .required(),
});

export { userRegisterSchema, userSchemaLogin, propertySchema };