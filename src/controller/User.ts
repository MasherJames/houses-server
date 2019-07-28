import {getRepository} from 'typeorm';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../entity/User';

dotenv.config();

export default class UserController {

  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.isadmin = false;

    const newUser = await getRepository(User).save(user);
    return res.status(201).json({
      status: 'success',
      data: newUser,
    });

  }

  static async login(req: Request, res: Response){
    const { email, password } = req.body;

    const currentuser: any = await getRepository(User).findOne({ email });
    if(!currentuser){
      return res.status(404).json({
        'status':'error',
        'error':'There is no user with this email'
      });
    }

    const passwordMatch: boolean = bcrypt.compareSync(password, currentuser.password);
    if(!passwordMatch){
      return res.status(401).json({
        'status':'error',
        'error':`Wrong password for ${email}`
      });
    }

    const payload = {
      email: currentuser.email,
      firstname: currentuser.username,
      id: currentuser.id,
    }

    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      } else {
        const user = {
          id: currentuser.id,
          email: currentuser.email,
          username: currentuser.username
        }
        return res.status(200).json({
          status: 'success',
          data: user,
          token
        });
      }
    });

  }

}