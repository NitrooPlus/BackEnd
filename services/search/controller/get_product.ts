import db from "../../../DB/db";
import serach_algorithm from "../helper/search_algorithm";

async function search_product(
    query: string,
    skip:number,
    count:number
  ) {
    try {

      if (query) {
        let a = serach_algorithm(query);
  
        let product_list: any[] =
          await db.query(`SELECT title,url,price
          FRom products
          WHERE  MATCH(title)
          AGAINST('${a}' IN BOOLEAN MODE)
          Limit ${skip},${count}`);
  
        product_list = product_list?.[0]?.length > 0 ? product_list?.[0] : [];
  
        return { status: 200, content: product_list };
      } else {
        let product_list: any[] =
          await db.query(`SELECT title,url,price
          FRom products
          Limit ${skip},${count}
          `);
  
        product_list = product_list?.[0]?.length > 0 ? product_list?.[0] : [];
  
        return { status: 200, content: product_list };
      }
    } catch (e) {
      console.log(e);
      return { status: 500, content: { message: "مشکلی پیش آمده است" } };
    }
  }
  
  export default search_product;