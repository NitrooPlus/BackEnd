import { Exclude,Expose,Transform } from "class-transformer";
import {IsNotEmpty,IsEmail,ValidateIf,Validate, Length,MaxLength} from 'class-validator'
import { Url_validate } from "./url";

@Exclude()
export class Company{
    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @MaxLength(100,{message:'این فیلد نباید بیشتر از 100 حرف باشد'})
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @Expose()
    title:string;
    

    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @Validate(Url_validate)
    @MaxLength(80,{message:'این فیلد نباید بیشتر از 100 حرف باشد'})
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @Expose()
    url:string;


    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @MaxLength(80,{message:'این فیلد نباید بیشتر از 80 حرف باشد'})
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @Expose()
    location:string;


    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @Expose()
    description:string;


    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @Expose()
    logo:string;


    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @Expose()
    header_image:string;




}