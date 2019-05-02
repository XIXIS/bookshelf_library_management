import Book from '../models/book';

const books = {

  /**
   * @api {get} /api/books List books
   * @apiDescription List all books
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Books
   * @apiVersion 1.0.0
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "success": true,
   *  "message": "success message.",
   *  "books" : [{ _id: 'adfmakln38709ojimkd0', title: 'title', ... },..]
   * }
   */
  listBooksOnHome(req, res) {
    /**
     * Get all books
     */
    Book.find({})
      .sort({title: 1, author: 1, genre: 1})
      .then((books) => {

        /**
         * return list of books
         */
        // return res.json({
        //   success: true,
        //   message: 'Books listed',
        //   books: books
        // });
        res.render('index', {books: books});


      }).catch((err) => {

      console.log(err);
      /**
       * Log find error to console and
       * return error object
       */
      // return res.status(500).json({
      //   success: false,
      //   message: 'An error occurred when finding list of books',
      //   error: err
      // });

      res.render('index', {books: [], error: err});
    });
  },

  /**
   * @api {get} /api/books List books
   * @apiDescription List all books
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Books
   * @apiVersion 1.0.0
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "success": true,
   *  "message": "success message.",
   *  "books" : [{ _id: 'adfmakln38709ojimkd0', title: 'title', ... },..]
   * }
   */
  listBooksOnDashboard(req, res) {
    /**
     * Get all books
     */
    Book.find({})
      .sort({title: 1, author: 1, genre: 1})
      .then((books) => {

        /**
         * return list of books
         */
        // return res.json({
        //   success: true,
        //   message: 'Books listed',
        //   books: books
        // });
        res.render('dashboard', {books: books});


      }).catch((err) => {

      console.log(err);
      /**
       * Log find error to console and
       * return error object
       */
      // return res.status(500).json({
      //   success: false,
      //   message: 'An error occurred when finding list of books',
      //   error: err
      // });

      res.render('dashboard', {books: [], error: err});
    });
  },


  /**
   * @api {get} /api/books List books
   * @apiDescription List all books
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Books
   * @apiVersion 1.0.0
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "success": true,
   *  "message": "success message.",
   *  "books" : [{ _id: 'adfmakln38709ojimkd0', title: 'title', ... },..]
   * }
   */
  list(req, res) {
    /**
     * Get all books
     */
    Book.find({})
      .sort({title: 1, author: 1, genre: 1})
      .then((books) => {

        /**
         * return list of books
         */
        return res.json({
          success: true,
          message: 'Books listed',
          books: books
        });


      }).catch((err) => {

      console.log(err);
      /**
       * Log find error to console and
       * return error object
       */
      return res.status(500).json({
        success: false,
        message: 'An error occurred when finding list of books',
        error: err
      });

    });
  },


  /**
   * @api {post} /api/books Register user
   * @apiDescription Create user
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParam {String} firstName first name of user
   * @apiParam {String} lastName last name of user
   * @apiParam {String} email email of user
   * @apiParam {String} password password of user
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "success": true,
   *  "message": "success message.",
   *  "user" : { _id: 'adfmakln38709ojimkd0', firstName: 'first name', ... }
   * }
   */
  create(req, res) {

    /**
     * Check if user already exists and create it otherwise
     */
    Book.find({email: req.body.email}).then((user) => {

      /**
       * If user matches email
       * return status 409 and indicate existence of user
       */
      if (user) {
        return res.status(409).json({
          success: false,
          message: 'Book with email already exists',
        });
      }

      /**
       * Create user if user don't already exist
       */
      Book.create(req.body).then((nBook) => {
        return res.json({
          success: true,
          message: 'Book registration successful',
          user: nBook
        });

      }).catch((err) => {

        /**
         * Log creation error to console
         * return error object
         */
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'An error occurred when creating user',
          error: err
        });

      });

    }).catch((err) => {

      /**
       * Log find error to console
       * return error object
       */
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'An error occurred when finding existing user',
        error: err
      });

    });
  },


};

export default books;