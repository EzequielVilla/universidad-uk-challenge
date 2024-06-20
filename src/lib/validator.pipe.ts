import {
  ArgumentMetadata,
  BadRequestException,
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
      console.log('Validation errors:', errors);
      this.logConstraintsErrors(errors);
      throw new BadRequestException('VALIDATION_FAILED');
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
}
