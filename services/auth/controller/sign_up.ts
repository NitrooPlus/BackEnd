import bcrypt from "bcrypt";
import db from "../../../DB/db";
import jwt from "jsonwebtoken";

async function sign_up(user: any) {
  try {
    if (!(user?.phone && user?.first_name && user?.last_name && user?.hashed && user?.code)){

        return { status: 400, content: { message: "تمام فیلد ها را پر کنید" } };
    }

    const check = await bcrypt.compare(`${user.phone}${process.env.BCRYPT_KEY}${user.code}`, user.hashed);

    if (!check)
      return { status: 400, content: { message: "کد وارد شده اشتباه است" } };

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
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default sign_up;
