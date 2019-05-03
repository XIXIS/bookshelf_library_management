import Book from "../../app/models/book";
import User from "../../app/models/user";
import helper from "../../app/libraries/helper";
import jwt from 'jsonwebtoken';
import config from '../../config/config';

describe("Routes: Books", () => {

  let token, userId, bookId;

  before(done => {
    User.deleteMany({}).then(() => {
      User.create({
        firstName: "Anthony Alexis",
        lastName: "Adoasi",
        email: "anthonyalexisadoasi@gmail.com",
        password: "Genesis1:1",
      }).then(user => {
        Book.deleteMany({}).then(() => Book.create([{
          title: "title 1",
          author: "author name",
          genre: "Romance",
          summary: "This books summary",
        }, {
          title: "title 2",
          author: "2 author name",
          genre: "Classics",
          summary: "This book2 summary",
        }])).then((books) => {
          token = jwt.sign(helper.signUser(user), config.jwtSecret);
          userId = user._id;
          bookId = books[0]._id;
          done();
        }).catch(err => {
          done(err);
        });
      }).catch((err) => {
        done(err);
      });
    });
  });

  // after(done => {
  //   Admin.deleteMany({}).then(() => {
  //     done();
  //   }).catch(err => {
  //     done(err);
  //   });
  // });

  describe('GET /api/books', () => {

    describe('status 200', () => {

      it('returns a list of books', done => {
        request.get('/api/public/books')
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.be.true;
            expect(res.body.books.length).to.equal(2);
            done(err);
          });
      });

    });

  });


  describe('POST /api/books', () => {

    describe('status 200', () => {

      it('creates a new book', done => {
        request.post('/api/books')
          .set('x-access-token', token)
          .send({
            title: "title 3",
            author: "author name 3",
            genre: "Philosophy",
            summary: "This book3",
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.be.true;
            done(err);
          });
      });

    });

    describe('status 409', () => {

      it('returns book already exists', done => {
        request.post('/api/books')
          .set('x-access-token', token)
          .send({
            title: "title 3",
            author: "author name 3",
            genre: "Philosophy",
            summary: "This book3",
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body.success).to.be.false;
            done(err);
          });
      });

    });

  });


  describe('PUT /api/books/:bookId', () => {

    describe('status 200', () => {

      it('updates book details', done => {
        request.put(`/api/books/${bookId}`)
          .set('x-access-token', token)
          .send({
            title: 'New title'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.be.true;
            done(err);
          });
      });

    });

    describe('status 404', () => {

      it('returns book does not exist', done => {
        request.put('/api/books/5aa5409cdf13b028981a17f5')
          .set('x-access-token', token)
          .send({
            title: 'New book'
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body.success).to.be.false;
            done(err);
          });
      });

    });
  });

  // describe('DELETE /api/users/:userId', () => {
  //
  //   describe('status 200', () => {
  //
  //     it('deletes user', done => {
  //       request.delete(`/api/users/${userId}`)
  //         .set('x-access-token', token)
  //         .expect(200)
  //         .end((err, res) => {
  //           expect(res.body.success).to.be.true;
  //           done(err);
  //         });
  //     });
  //
  //   });
  //
  //   describe('status 404', () => {
  //
  //     it('returns user does not exist', done => {
  //       request.delete('/api/users/5aa0000000001111177717f5')
  //         .set('x-access-token', token)
  //         .expect(404)
  //         .end((err, res) => {
  //           expect(res.body.success).to.be.false;
  //           done(err);
  //         });
  //     });
  //
  //   });
  //
  //
  // });

});