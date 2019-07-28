import {Request, Response, NextFunction} from 'express';
import propertyValidators from '../validators/property';

export default class PropertyMiddleware {

  static async propertyInputsValidator(req: Request, res: Response, next: NextFunction) {
    const { errors, isValid } = propertyValidators['propertyValidator'](req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    next();
  }
}