import express from 'express';
import auth from "../app/controllers/auth";
import users from "../app/controllers/users";
import books from "../app/controllers/books";

const router = express.Router();

export default () => {

  /**
   * Server status route
   * Checks the status of the server
   */
  router.get('/status', (req, res) => {
    res.json({
      success: true, message: 'server up and running...'
    })
  });


  /**
   * HTML Page Routes
   */
  router.get('/', books.listBooksOnHome);
  router.get('/login', (req, res) => {
    res.render('login', {});
  });
  router.get('/register', (req, res) => {
    res.render('register', {});
  });
  router.get('/dashboard', books.listBooksOnDashboard);



  /**
   * Auth routes
   */
  router.post('/api/auth/login', auth.userLogin);
  router.post('/api/auth/user/register', users.create);

  // user routes
  // router.get('/user', users.list);
  router.post('/api/users', users.create);
  // router.get('/admins/:adminId', admins.details);
  // router.put('/admins/:adminId', admins.update);
  // router.delete('/admins/:adminId', admins.deleteAdmin);


  /**
   * Book routes
   */
  router.get('/api/public/books', books.list);
  router.post('/api/books', books.create);
  router.put('/api/books/:bookId', books.updateBook);
  router.post('/api/public/books/search', books.listSearchedBooks);

  
  return router;
}