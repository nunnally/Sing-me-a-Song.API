import * as supertest from 'supertest';
import app from "../src/app";


describe('POST /recommendation',()=>{
    it("returns 400 for no body sent",async ()=>{
        const result = await supertest(app).post("/recommendation")
        expect(result.status).toEqual(400);
    });
});






