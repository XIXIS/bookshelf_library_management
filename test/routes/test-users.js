import User from "../../app/models/user";
import helper from "../../app/libraries/helper";
import jwt from 'jsonwebtoken';
import config from '../../config/config';

describe("Routes: Users", () => {

  let token, userId;

  before(done => {

    User.deleteMany({}).then(() => User.create([{
      firstName   : "Anthony Alexis",
      lastName    : "Adoasi",
      email       : "anthonyalexisadoasi@gmail.com",
      password    : "Genesis1:1",
    }, {
      firstName   : "Dennis",
      lastName    : "Machu",
      email       : "dennismachu@gmail.com",
      password    : "Genesis1:2",
    }])).then((users) => {
      token = jwt.sign(helper.signUser(users[0]), config.jwtSecret);
      userId = users[0]._id;
      done();
    }).catch(err => {
      done(err);
    });

  });

  // after(done => {
  //   Admin.deleteMany({}).then(() => {
  //     done();
  //   }).catch(err => {
  //     done(err);
  //   });
  // });


  describe('POST /api/auth/user/register', () => {

    describe('status 200', () => {

      it('creates a new user', done => {
        request.post('/api/auth/user/register')
          .set('x-access-token', token)
          .send({
            firstName: "Elvis",
            lastName: "Odoo",
            email: "elviss@mail.com",
            password: "Genesis1:3",
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.be.true;
            done(err);
          });
      });

    });

    describe('status 409', () => {

      it('returns user already exists', done => {
        request.post('/api/auth/user/register')
          .set('x-access-token', token)
          .send({
            firstName: "Elvis",
            lastName: "Odoo",
            email: "elviss@mail.com",
            password: "Genesis1:3",
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body.success).to.be.false;
            done(err);
          });
      });

    });

  });



});