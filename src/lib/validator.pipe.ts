import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      this.logConstraintsErrors(errors);
      console.log('Validation errors:', errors);
      const response = this.getPropertyAndConstraintMessage(errors);

      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private logConstraintsErrors(errors: ValidationError[], property?: string) {
    errors.map((error) => {
      if (error.children && error.children.length > 0) {
        this.logConstraintsErrors(error.children, error.property);
      }
      if (error.constraints) {
        if (property) console.log({ property });
        console.log('VALIDATOR_ERROR_CONSTRAINTS:', error.constraints);
      }
    });
  }
  private getPropertyAndConstraintMessage(errors: any) {
    return errors.map((error) => {
      const constraints = error.constraints;
      let message = '';
      for (const key in constraints) {
        if (constraints.hasOwnProperty(key)) {
          message = constraints[key];
        }
      }
      return {
        property: error.property,
        message,
      };
    });
  }
}
