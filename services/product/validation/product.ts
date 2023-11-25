import { Exclude,Expose,Transform } from "class-transformer";
import {IsNotEmpty,IsEmail,ValidateIf,Validate, Length,MaxLength} from 'class-validator'
import { Url_validate } from "../../company/validation/url";

@Exclude()
export class Product{

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
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @Expose()
    company_url:number;


    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @IsNotEmpty({message:'لطفا این فیلد را پر کنید'})
    @Expose()
    price:number;


    @Transform(({value})=>{
        if(!value)
        return null;
        return value;

    })
    @Expose()
    short_description:string;


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
    images:string[];




}