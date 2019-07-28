import Joi from 'joi';
import isEmpty from './isEmpty';
import { userRegisterSchema, userSchemaLogin } from './schema';

interface Errors {
    [key: string]: any;
}

const userValidators: object = {
    registerValidator: (data: object): object => {
        const errors: Errors = {};
        Joi.validate(data, userRegisterSchema, (err) => {
            if (err) {
                errors.message = err.details[0].message.replace(/"/gi, '');
            }
        });

        return {
            errors,
            isValid: isEmpty(errors),
        };
    },

    loginValidator: (data: object): object => {
        const errors: Errors = {};
        Joi.validate(data, userSchemaLogin, (err) => {
            if (err) {
                errors.message = err.details[0].message.replace(/"/gi, '');
            }
        });

        return {
            errors,
            isValid: isEmpty(errors),
        };
    },
};

export default userValidators;