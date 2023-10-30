import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'PhoneNum', async: false })
export class Url_validate implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const regex = /^[a-zA-Z0-9_]+$/;
    if(!text)
    return true
    return text?.match(regex) ?true:false; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'url فقط میتواند دارای حروف انگلیسی یا اعداد و یا _ باشد';
  }
}