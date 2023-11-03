require('dotenv').config();
import db from "../../DB/db";
import 'jest-extended';
let request = require('supertest');
request=request(`http://localhost:${process.env.PORT}`)

let testData={
  users:[{first_name:'f1',last_name:'l2',phone:'09396077497',wrong_hashed:'dddddd',code:700000}]
}
beforeAll(async () => {
    console.log('verify_phone')
    await db.execute(`delete from user`)
    await db.execute(`INSERT INTO user (first_name,last_name,phone) VALUES ${[testData.users.map(u =>'('+ [`'${u.first_name}'`,`'${u.last_name}'`,`'${u.phone}'`].join(',')+')')].join(',')}`);
    
});


describe('/verify_phone', () => {


  
    it('Bad request', async () => {
      const response = await request.post('/auth/verify_phone');
      expect(response._body).toEqual({ message: "درخواست اشتباه است"})
      expect(response.status).toBe(400);
    });


    it('wrong hashed', async () => {
      const response = await request.post('/auth/verify_phone').send({phone:testData.users[0].phone,code:testData.users[0].code,hashed:testData.users[0].wrong_hashed});
      expect(response._body).toEqual({ message: "کد وارد شده اشتباه است" })
      expect(response.status).toBe(400);
    });


    it('correct login', async () => {
      await db.execute(`delete from user`)
      await db.execute(`INSERT INTO user (first_name,last_name,phone) VALUES ${[testData.users.map(u =>'('+ [`'${u.first_name}'`,`'${u.last_name}'`,`'${u.phone}'`].join(',')+')')].join(',')}`);
    
      const response = await request.post('/auth/send_code').send({phone:'09396077497'});
      const response_user = await request.post('/auth/verify_phone').send({phone:testData.users[0].phone,code:testData.users[0].code,hashed:response._body.hashed});
      expect(response_user._body).toHaveProperty('token');
      expect(response_user._body.user).toEqual(expect.objectContaining({ 
        first_name:'f1',
        last_name:'l2',
        phone:'09396077497'
    }));
      expect(response.status).toBe(200);
    });


    it('correct signup', async () => {
        const response = await request.post('/auth/send_code').send({phone:'09399999999'});
        const response_user = await request.post('/auth/verify_phone').send({phone:'09399999999',code:testData.users[0].code,hashed:response._body.hashed});
        expect(response_user._body).toEqual({sign_up:true});
        expect(response.status).toBe(200);
      });
  
  
  
  });