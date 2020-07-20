import { ValidationError } from 'joi';
import { Response } from 'express';

export const discrimString = (discrim: string | number) =>
  typeof discrim === 'string'
    ? discrim
    : discrim.toString().padStart(4, '0');

export const sendValidationError = (res: Response, err: ValidationError, errorCode: number = 400) => {
  let result = {};
  for (let d of err.details) {
    switch (d.type) {
      case 'string.min':
        result[d.context.key] = 'Must be at least ' + d.context.limit + ' characters long.';
        break;
      case 'string.max':
        result[d.context.key] = 'Must be at most ' + d.context.limit + ' characters long.';
        break;
      case 'string.pattern.base':
        result[d.context.key] = 'Invalid ' + d.context.key;
        break;
      case 'object.unknown':
        result[d.context.key] = 'Invalid property.';
        break;
      case 'any.required':
        result[d.context.key] = 'This field is required';
        break;
      default:
        result[d.context.key] = 'Unknown error.';
        break;
    }
  }

  res.status(errorCode).send(result);
};