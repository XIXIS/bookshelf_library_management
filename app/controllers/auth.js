import jwt from '../../config/middlewares/auth';
import User from '../models/user';

export default {

  /**
   * @api {post} /api/auth/login Login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam {String} email Email of user.
   * @apiParam {String} password Password of user.
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "success": true,
   *      "user": {
   *          "_id": "78987809897898",
   *          "firstName": "Finn",
   *          "lastName": "Bale",
   *          ...
   *       },
   *      "token": "a long token",
   *      "message": "Success message"
   *     }
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "success": false,
   *       "message": "fail description"
   *     }
   */
  userLogin(req, res) {

    /**
     * Find user matching email and return object
     */
    User.findOne({email: req.body.email}).then((user) => {

      //If no user is found
      if (!user) {
        return res.status(422).json({success: false, message: 'Invalid email/password.'});
      }

      //If user is found but entered wrong password return invalid credentials
      if (!user.isValidPassword(req.body.password)) {
        return res.status(422).json({success: false, message: 'Invalid username/password.'});
      }

      //If user is inactive, inform user of inactive account
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Sorry your account is inactive. Contact your administrator'
        });
      }

      let newToken = jwt.signUser(user);

      /**
       * Update user record with login token
       * return user record with login token
       */
      User.updateOne({_id: user._id}, {$set: {token: newToken}}).then(() => {
        user = user.toObject();
        delete user.password;
        return res.json({
          success: true,
          message: 'Login successful',
          user: user,
          token: newToken
        });
      })

    }).catch(err => {

      /**
       * Return error code 500 and message should an error occur
       */
      console.log(err);
      return res.status(500).json({
        success: false,
        error: err,
        message: 'Failed to login. try again'
      });
    });
  },





};