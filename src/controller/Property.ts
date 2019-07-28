import {getRepository} from 'typeorm';
import { Request, Response } from 'express';

import { Property } from '../entity/Property';

export default class PropertyController {

  static async create(req: Request, res: Response) {
    const { price, state, type, imageurl} = req.body;

    const property = new Property();
    property.price = price;
    property.state = state;
    property.type = type;
    property.imageurl = imageurl;
    property.user = req.user.id;

    const newProperty = await getRepository(Property).save(property);
    return res.status(201).json({
      status: 'success',
      data: newProperty,
    });
  }

  static async listAll(req: Request, res: Response){
    const properties = await getRepository(Property).find();
    if(!properties.length){
      return res.status(404).json({
        status: 'error',
        error: 'There are properties for now'
      });
    }

    return res.status(200).json({
      status: 'succes',
      data: properties,
    });

  }

  static async getOne(req: Request, res: Response){
    const { params : { propertyId } } = req;

    const property = await getRepository(Property).findOne({ id: propertyId });
    if(!property){
      return res.status(404).json({
        status: 'error',
        error: 'Property with id does not exist'
      })
    }
    return res.status(200).json({
      status: 'succes',
      data: property,
    });

  }

  static async update(req: Request, res: Response) {
    const { 
      params : { propertyId }, 
      body: { price, state, type, imageurl } 
    } = req;

    const property = await getRepository(Property).findOne({ id: propertyId });
    if(!property) {
      return res.status(404).json({
        status: 'error',
        error: 'Property with id does not exist'
      });
    }

    property.price = ( price === undefined ? property.price : price );
    property.state = ( state === undefined ? property.state : state );
    property.type = ( type === undefined ? property.type : type );
    property.imageurl = ( imageurl === undefined ? property.imageurl : imageurl );

    const updateProperty = await getRepository(Property).save(property);

    return res.status(202).json({
      status: 'success',
      data: updateProperty
    });

  }

  static async delete(req: Request, res: Response) {
    const { params : { propertyId } } = req;

    const property = await getRepository(Property).findOne({ id: propertyId });
    if(!property) {
      return res.status(404).json({
        status: 'error',
        error: 'Property with id does not exist'
      });
    }

    await getRepository(Property).remove(property);

    return res.status(200).json({
      status: 'success',
      data: 'Property deleted succesfully'
    });
  }

}
