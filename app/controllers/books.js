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
      .sort({createdAt: 1, title: 1, author: 1, genre: 1})
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
      .sort({createdAt: 1, title: 1, author: 1, genre: 1})
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
   * @api {post} /api/books/search List searched books
   * @apiDescription List all searched books
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Books
   * @apiVersion 1.0.0
   *
   * @apiParam {String} search search parameter
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "success": true,
   *  "message": "success message.",
   *  "books" : [{ _id: 'adfmakln38709ojimkd0', title: 'title', ... },..]
   * }
   */
  listSearchedBooks(req, res) {
    /**
     * Get all books
     */
    Book.find({
      $or: [
        {genre: {$regex: `${req.body.search}`, $options: 'i'}},
        {title: {$regex: `${req.body.search}`, $options: 'i'}},
      ]
    }).sort({createdAt: 1, title: 1, author: 1, genre: 1}).then((books) => {

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
   * @api {post} /api/books Add book
   * @apiDescription Create book
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Books
   * @apiVersion 1.0.0
   *
   * @apiParam {String} title title of book
   * @apiParam {String} author author book
   * @apiParam {String} genre genre of book
   * @apiParam {String} summary book summary
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "success": true,
   *  "message": "success message.",
   *  "book" : { _id: 'adfmakln38709ojimkd0', title: 'title', ... }
   * }
   */
  create(req, res) {

    /**
     * Check if book already exists and create it otherwise
     */
    Book.findOne({title: req.body.title, author: req.body.author, genre: req.body.genre}).then((book) => {

      /**
       * If book already exists
       * return status 409 and indicate existence of user
       */
      if (book) {
        return res.status(409).json({
          success: false,
          message: 'Book already exists',
        });
      }

      /**
       * Create user if user don't already exist
       */
      Book.create(req.body).then((nBook) => {
        return res.json({
          success: true,
          message: 'Book successfully added',
          book: nBook
        });

      }).catch((err) => {

        /**
         * Log creation error to console
         * return error object
         */
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'An error occurred when adding book',
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
        message: 'An error occurred when finding existing book',
        error: err
      });

    });
  },


  /**
   * @api {put} /api/books/:bookId Update book
   * @apiDescription Updates a book
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Books
   * @apiVersion 1.0.0
   *
   * @apiParam {String} title title of book
   * @apiParam {String} author author book
   * @apiParam {String} genre genre of book
   * @apiParam {String} summary book summary
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *     	"success": true,
   *		"message": "success message."
   *     }
   */
  updateBook(req, res) {
    Book.findOne({_id: req.params.bookId}).then((book) => {

      if (!book) return res.status(404).json({success: false, message: 'Book does not exist'});

      Book.updateOne({_id: req.params.bookId}, {$set: req.body}).then(() => {
        return res.json({
          success: true,
          message: 'Book details updated successfully',
        })
      }).catch((err) => {
        return res.json({
          success: false,
          message: 'Error occurred when updating book details',
          error: err
        });
      })
    }).catch((err) => {
      return res.json({
        success: false,
        message: 'Error occurred when finding existing book',
        error: err
      });
    })

  },

  /**
   * @api {delete} /api/books/:bookId Delete book
   * @apiDescription Delete a book
   * @apiHeader {String} x-access-token Access token of authorized user
   * @apiGroup Books
   * @apiVersion 1.0.0
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *     	"success": true,
   *		"message": "success message."
   *     }
   */
  deleteBook(req, res) {
    Book.deleteOne({_id: req.params.bookId}).then((result) => {
      // console.log(result, req.params);
      return res.json({
        success: true,
        message: 'Book successfully deleted'
      });
    }).catch((err) => {
      console.log(err);
      res.json({
        success: false,
        message: 'An error occurred deleting book',
        error: err
      });
    })


  },

};

export default books;