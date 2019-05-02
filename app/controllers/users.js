import User from '../models/user';

const users = {

  /**
   * @api {post} /api/users Register user
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
    User.findOne({email: req.body.email}).then((user) => {

      /**
       * If user matches email
       * return status 409 and indicate existence of user
       */
      if (user) {
        return res.status(409).json({
          success: false,
          message: 'User with email already exists',
        });

      }

      /**
       * Create user if user don't already exist
       */
      User.create(req.body).then((nUser) => {
        return res.json({
          success: true,
          message:"Registration successful! <br>Click <a href='/login' class='grey-text text-lighten-4'>Here to Login</a>",
          user: nUser
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

export default users;