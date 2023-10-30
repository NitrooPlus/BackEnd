import { Exclude,Expose,Transform } from "class-transformer";
import {IsNotEmpty,IsEmail,ValidateIf,Validate, Length,MaxLength} from 'class-validator'
import { Phone_number } from "./phone_number";
@Exclude()
export class Phone{
    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @Validate(Phone_number)
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @Expose()
    phone:string;


}