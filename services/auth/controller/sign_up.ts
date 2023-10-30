import bcrypt from "bcrypt";
import db from "../../../DB/db";
import jwt from "jsonwebtoken";
import transform_error from "../../../helper/transform_error";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { User } from "../validation/user";

async function sign_up(user: any) {
  try {

    //validate user with validation schema start ...
    const obj=plainToInstance(User,user)

    const err= await validate(obj);

    const errObj=transform_error(err);

    if(Object.keys(errObj)?.[0])
        return({status:400,content:errObj})

    //end


    //check request is correct or not start ...

    if (!(user?.phone && user?.first_name && user?.last_name && user?.hashed && user?.code)){

        return { status: 400, content: { message: "درخواست اشتباه است" } };
    }

    //end


    //check code with hashed that determine phone is validate before or not start ...

    const check = await bcrypt.compare(`${user.phone}${process.env.BCRYPT_KEY}${user.code}`, user.hashed);

    if (!check)
      return { status: 400, content: { message: "کد وارد شده اشتباه است" } };


    //end

    await db.execute(`INSERT INTO user(last_name,first_name,phone)
          VALUES ('${user.last_name}','${user.first_name}','${user.phone}')`);

    const users: any[] = await db.execute(
      `SELECT id,first_name,last_name,phone from user where phone='${user.phone}'`
    );

    if (users?.[0]?.[0])
      return {status: 200, content: { user: users[0][0], token: jwt.sign({ ...users[0][0] }, process.env.JWT_KEY || 'iust' , { expiresIn: 60 * 60 * 24 * 30})}};
    
    else
      return {
        status: 404,
        content: {message:"مشکلی پیش آمده است"},
      };
  } catch (e) {
    console.log(process.env.JWT_KEY)
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default sign_up;
