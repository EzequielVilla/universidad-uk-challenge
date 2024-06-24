import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Schema } from 'mongoose';

export const ValidateUpdateDTO = createParamDecorator(
  (entitySchema: Schema, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const bodyUpdateDto = request.body;
    const entityKeys = Object.keys(entitySchema.obj);
    const updateKeys = Object.keys(bodyUpdateDto);
    const propertyDontExistInEntity = updateKeys.filter(
      (key) => !entityKeys.includes(key),
    );
    if (propertyDontExistInEntity.length > 0) {
      console.log(`BAD_PROPERTIES_IN_REQUEST: ${propertyDontExistInEntity}`);
      throw new HttpException(
        `BAD_PROPERTIES_IN_REQUEST: ${propertyDontExistInEntity}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return bodyUpdateDto;
  },
);
