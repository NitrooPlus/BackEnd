require('dotenv').config();
import db from "../../DB/db";
import 'jest-extended';
let request = require('supertest');
request=request(`http://localhost:${process.env.PORT}`)

let testData={
    users:[{id:12,first_name:'f1',last_name:'l2',phone:'09111111111'}],
  companies:[{
  "title":"برنز زرین",
  "url":"bronzi",
  "location":"تهران",
  "description":"متن تست"
}]
}
beforeAll(async () => {
    await db.execute(`delete from user`)
    await db.execute(`delete from company`)
    await db.execute(`INSERT INTO user (id,first_name,last_name,phone) VALUES ${[testData.users.map(u =>'('+ [u.id,`'${u.first_name}'`,`'${u.last_name}'`,`'${u.phone}'`].join(',')+')')].join(',')}`);
    await db.execute(`INSERT INTO company (title,url,location,description,for_user) VALUES ${[testData.companies.map(u =>'('+ [`'${u.title}'`,`'${u.url}'`,`'${u.location}'`,`'${u.description}'`,12].join(',')+')')].join(',')}`);
});


describe('/company', () => {


  
    it('Bad request', async () => {
      const response = await request.get('/company/get_company_information');
      expect(response.status).toBe(400);
    });

    it('NOT found', async () => {
        const response = await request.get('/company/get_company_information').query({ url: ':)'});
        expect(response.status).toBe(404);
      });

    it('correct get request', async () => {
        const response = await request.get('/company/get_company_information').query({ url: testData.companies[0].url});
        expect(response._body).toEqual(expect.objectContaining({
            "title": testData.companies[0].title,
            "url": testData.companies[0].url,
            "description": testData.companies[0].description,
            "logo": null,
            "product_count": 0
        }));
        expect(response.status).toBe(200);
    });
  
  
  
  });