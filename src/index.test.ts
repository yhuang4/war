import app from './index';
import request from 'supertest';

describe("api tests", () => {
    it("GET /",  (done) => {
        request(app)
        .get("/wins")
        .expect(200)
        .expect((res) => {

        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
          });
    // More things come here
  });
});