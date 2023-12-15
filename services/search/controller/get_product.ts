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
          await db.query(`SELECT p.title,p.url,p.price,p.images,c.title as company_title,c.url as company_url, c.logo as company_logo, c.header_image as company_header_image
          FRom products p
          JOIN company c
          ON c.id=p.company_id
          WHERE  MATCH(p.title)
          AGAINST('${a}' IN BOOLEAN MODE)
          Limit ${skip},${count}`);
  
        product_list = product_list?.[0]?.length > 0 ? product_list?.[0] : [];
  
        return { status: 200, content: product_list };
      } else {
        let product_list: any[] =
          await db.query(`SELECT p.title,p.url,p.price,p.images,c.title as company_title,c.url as company_url, c.logo as company_logo, c.header_image as company_header_image
          FRom products p
          JOIN company c
          ON c.id=p.company_id
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