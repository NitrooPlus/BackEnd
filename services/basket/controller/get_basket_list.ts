import db from "../../../DB/db";

async function get_basket_list(user:any) {
  try {

    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }


        let data:any=await db.execute(`SELECT c.title as company_title,c.url as company_url,p.images,p.price,p.url,p.title,p.id,count(p.id) as counts from basket b
        join products p 
        on p.id=b.product_id
        join company c
        on p.company_id=c.id
        group by p.id`)

    return {status:200,content:data?.[0] || []}
  } catch (e) {
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default get_basket_list;