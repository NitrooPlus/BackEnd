import bcrypt from "bcrypt";
import db from "../../../DB/db";
import jwt from "jsonwebtoken";

async function verify_phone(phone:string,hashed:string,code:number) {
  try {
    if (!(phone && hashed && code)){

        return { status: 400, content: { message: "درخواست اشتباه است" } };
    }

    const check = await bcrypt.compare(`${phone}${process.env.BCRYPT_KEY}${code}`, hashed);

    if (!check)
      return { status: 400, content: { message: "کد وارد شده اشتباه است" } };

    const users: any[] = await db.execute(
      `SELECT id,first_name,last_name,phone from user where phone='${phone}'`
    );

    if (users?.[0]?.[0])
      return {status: 200, content: { user: users[0][0], token: jwt.sign({ ...users[0][0] }, process.env.JWT_KEY || 'iust' , { expiresIn: 60 * 60 * 24 * 30})}};
    
    else
      return {
        status: 200,
        content: {sign_up:true},
      };
  } catch (e) {
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default verify_phone;
