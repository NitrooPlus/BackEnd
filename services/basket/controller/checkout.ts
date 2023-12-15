import db from "../../../DB/db";

async function check_out(user:any,products:{id:number,count:number}[]) {
  try {

    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }

    const product_list=products.map((e)=>{
        return `(${user.id},${e.id},${e.count})`
    })


        await db.execute(`INSERT INTO check_out (user_id,product_id,count)
        VALUES ${product_list.join(',')}
        `)

    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}
  } catch (e) {
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default check_out;