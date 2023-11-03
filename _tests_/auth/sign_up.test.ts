require('dotenv').config();
import db from "../../DB/db";
import 'jest-extended';
let request = require('supertest');
request=request(`http://localhost:${process.env.PORT}`)

let testData={
  users:[{first_name:'f1',last_name:'l2',phone:'09399999998',wrong_hashed:'dddddd',code:700000}]
}
beforeAll(async () => {
    console.log('sign_up')
    await db.execute(`delete from user`)
});


describe('/sign_up', () => {


  
    it('Bad request', async () => {
      const response = await request.post('/auth/sign_up');
      expect(response._body).toEqual({ phone: 'لطفا این فیلد را پر کنید',first_name: 'لطفا این فیلد را پر کنید',last_name: 'لطفا این فیلد را پر کنید'})
      expect(response.status).toBe(400);
    });


    it('wrong hashed', async () => {
      const response = await request.post('/auth/sign_up').send({phone:testData.users[0].phone,code:testData.users[0].code,hashed:testData.users[0].wrong_hashed,first_name:testData.users[0].first_name,last_name:testData.users[0].last_name});
      expect(response._body).toEqual({ message: "کد وارد شده اشتباه است" })
      expect(response.status).toBe(400);
    });


    it('correct sign_up sign_up', async () => {
      const response = await request.post('/auth/send_code').send({phone:testData.users[0].phone});
      const response_user = await request.post('/auth/sign_up').send({phone:testData.users[0].phone,code:testData.users[0].code,hashed:response._body.hashed,first_name:testData.users[0].first_name,last_name:testData.users[0].last_name});
      expect(response_user._body).toHaveProperty('token');
      expect(response_user._body.user).toEqual(expect.objectContaining({ 
        first_name:'f1',
        last_name:'l2',
        phone:testData.users[0].phone
    }));
      expect(response.status).toBe(200);
    });


    it('correct get_user', async () => {
        const response = await request.post('/auth/send_code').send({phone:testData.users[0].phone});
        const response_user = await request.post('/auth/verify_phone').send({phone:testData.users[0].phone,code:testData.users[0].code,hashed:response._body.hashed});
        const data = await request.get('/auth/get_user').set('Cookie', `${process.env.COOKIE_NAME}=${response_user._body.token}`);
        expect(data._body).toEqual(expect.objectContaining({ 
            first_name:'f1',
            last_name:'l2',
            phone:testData.users[0].phone
        }));
        expect(response.status).toBe(200);
      });
  
  
  
  });