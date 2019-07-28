import { getRepository } from 'typeorm';
import {Request, Response, NextFunction} from 'express';
import userValidators from '../validators/user';
import { User } from '../entity/User';


export default class UserMiddleware {

  static async registerInputsValidator(req: Request, res: Response, next: NextFunction){
    const { errors, isValid } = userValidators['registerValidator'](req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    next();
  }

  static async uniqueUser(req: Request, res: Response, next: NextFunction){

    const { email } = req.body;
    const byEmail = await getRepository(User).findOne({ email });

    if(byEmail) {
      return res.status(409).json({
        status: 'error',
        error: 'user with this email already exists',
      });
    }
    next();
  }

  static async loginInputValidator (req: Request, res: Response, next: NextFunction) {
    const { errors, isValid } = userValidators['loginValidator'](req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    next();
  }

}