import db from "../../../DB/db";
import serach_algorithm from "../helper/search_algorithm";

async function search_company(
    query: string,
    skip:number,
    count:number
  ) {
    try {

      if (query) {
        let a = serach_algorithm(query);
  
        let company_list: any[] =
          await db.query(`SELECT title,url,location
          FRom company 
          WHERE  MATCH(title)
          AGAINST('${a}' IN BOOLEAN MODE)
          Limit ${skip},${count}`);
  
        company_list = company_list?.[0]?.length > 0 ? company_list?.[0] : [];
  
        return { status: 200, content: company_list };
      } else {
        let company_list: any[] =
          await db.query(`SELECT title,url,location
          FRom company 
          Limit ${skip},${count}
          `);
  
        company_list = company_list?.[0]?.length > 0 ? company_list?.[0] : [];
  
        return { status: 200, content: company_list };
      }
    } catch (e) {
      console.log(e);
      return { status: 500, content: { message: "مشکلی پیش آمده است" } };
    }
  }
  
  export default search_company;