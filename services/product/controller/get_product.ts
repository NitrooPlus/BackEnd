import bcrypt from "bcrypt";
import db from "../../../DB/db";
import jwt from "jsonwebtoken";

async function get_product(url: string, company_url: string) {
  try {
    if (!url || !company_url)
      return {
        status: 400,
        content: { message: "نام غرفه و محصول باید مشخص باشد" },
      };

    let data: any =
      await db.execute(`SELECT p.*,c.url as company_url,c.title as company_name FROM products p
    JOIN company c
    ON c.id=p.company_id
    WHERE c.url='${company_url}' AND p.url='${url}'`);

    if (data?.[0]?.[0]) return { status: 200, content: data[0][0] };
    else return { status: 404, content: { message: "محصول یافت نشد" } };
  } catch (e) {
    console.log(e);
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default get_product;
