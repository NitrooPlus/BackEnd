require('dotenv').config();
import db from "../../DB/db";
import 'jest-extended';
let request = require('supertest');
request=request(`http://localhost:${process.env.PORT}`)

// let testData={
//   users:[{first_name:'f1',last_name:'f2',phone:'09396077497'}]
// }
beforeAll(async () => {
    await db.execute(`delete from user where NOT id=0`)
    // await db.execute(`INSERT INTO user (first_name,last_name,phone) VALUES ${[testData.users.map(u =>'('+ [`'${u.first_name}'`,`'${u.last_name}'`,`'${u.phone}'`].join(',')+')')].join(',')}`);
});


describe('/send_code', () => {


  
    it('Bad request', async () => {
      const response = await request.post('/auth/send_code');
      console.log(response._body)
      expect(response._body).toEqual({
        phone:'لطفا این فیلد را پر کنید'
      })
      expect(response.status).toBe(400);
    });


    it('wrong phone number', async () => {
      const response = await request.post('/auth/send_code').send({phone:'09'});
      console.log(response._body)
      expect(response._body).toEqual({
        phone:'شماره همراه باید 11 رقمی باشد و با 09 شروع شود'
      })
      expect(response.status).toBe(400);
    });


    it('correct phone number', async () => {
      const response = await request.post('/auth/send_code').send({phone:'09396077497'});
      console.log(response._body)
      expect(response._body).toHaveProperty('hashed');
      expect(response.status).toBe(200);
    });
  
  
  
  });