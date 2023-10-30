import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'PhoneNum', async: false })
export class Phone_number implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const numbers = /^[0-9]+$/;
    if(!text)
    return true
    return text?.match(numbers) && text?.length==11&&text[0]=='0'&&text[1]=='9'?true:false; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'شماره همراه باید 11 رقمی باشد و با 09 شروع شود';
  }
}