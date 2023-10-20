import { Exclude,Expose,Transform } from "class-transformer";
import {IsNotEmpty,IsEmail,ValidateIf,Validate, Length,MaxLength} from 'class-validator'
import { Phone_number } from "./phone_number";

@Exclude()
export class User{
    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @MaxLength(80,{message:'این فیلد نباید بیشتر از 80 حرف باشد'})
    @Expose()
    first_name:string;
    

    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @MaxLength(80,{message:'این فیلد نباید بیشتر از 80 حرف باشد'})
    @Expose()
    last_name:string;



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