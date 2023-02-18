import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 *
 * Validate the payload will be sending or receiving, make sure the data is suitable
 *
 * @param dto The DTO object to validate
 * @param obj The object recieved from response body
 *
 * @example
 * ```ts
 *  await validatorDto(EmployeeDTO, response.data.employee);
 *
 * ```
 */
// eslint-disable-next-line import/prefer-default-export
export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object,
) => {
  // tranform the literal object to class object
  const objInstance = plainToClass(dto, obj);
  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);
  // errors is an array of validation errors
  if (errors.length > 0) {
    throw new TypeError(
      `The error fields : ${errors.map(
        ({ property }) => property,
      )}`,
    );
  }
};
