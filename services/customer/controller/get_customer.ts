import db from "../../../DB/db";

async function get_customer_info(user: any) {
  try {

    let data: any = await db.execute(`SELECT * FROM user u where u.id='${user.id}'`)

    if (!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }

    return { status: 200, content: data[0][0]}

  } catch (e: any) {
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };

  }
}

export default get_customer_info;
