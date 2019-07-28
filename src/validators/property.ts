import Joi from 'joi';
import isEmpty from './isEmpty';
import { propertySchema } from './schema';

interface Errors {
    [key: string]: any;
}

const propertyValidators: object = {
    propertyValidator: (data: object): object => {
        const errors: Errors = {};

        Joi.validate(data, propertySchema, (err) => {
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

export default propertyValidators;