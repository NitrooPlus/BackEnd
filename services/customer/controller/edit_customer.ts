import db from "../../../DB/db";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import transform_error from "../../../helper/transform_error";
import { User } from "../../auth/validation/user";

async function edit_customer(body: any, user: any) {
  try {
    if (!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }

    let keys = Object.keys(body);

    let localuser = user;

    keys.forEach(k => {
      localuser[k] = body[k as any]
    })


    //validate customer with validation schema start ...
    const obj = plainToInstance(User, localuser)

    const err = await validate(obj);

    const errObj = transform_error(err);

    if (Object.keys(errObj)?.[0])
      return ({ status: 400, content: errObj })

    await db.execute(`UPDATE user
    SET first_name = '${localuser.first_name}', last_name = '${localuser.last_name}',  phone = '${localuser.phone}'
    WHERE id = ${localuser.id};`);


    return { status: 200, content: { message: 'عملیات با موفقیت انجام شد' } }

  } catch (e: any) {
    console.log(e.message)
    if (e?.message?.indexOf("user.phone_unique") >= 0)
      return { status: 400, content: { title: 'شماره تلفن تکراری است' } }

    return { status: 500, content: { message: "مشکلی پیش آمده است" } };

  }
}

export default edit_customer;
