"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function delete_customer(url, user) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
        try {
      
          if(!user?.id)
            return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }
          
          if(!url)
              return {status:400,content:'نام غرفه باید مشخص باشد'}
      
          let data:any=await db.execute(`DELETE FROM
          company c
          where c.url='${url}' AND for_user=${user.id}`)
      
          return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}
        } catch (e) {
          console.log(e)
          return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
        */
    });
}
exports.default = delete_customer;
