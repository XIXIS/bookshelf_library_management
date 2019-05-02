import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import config from '../config';
import helper from '../../app/libraries/helper';

dotenv.config();

export default {

  /**
   * Route middleware
   * Validate all routes - exclude validation on all routes with auth, status and public
   * Otherwise verify and decode auth token and append user to request
   */
  validate(req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.headers['x-access-token'];
    let url = req.url.split('/');
    // console.log('host = ',req.headers.host);
    // console.log('url = ',req.url);

    /**
     * Exclude validation on all routes with auth, status and public
     */
    if ( url.includes('auth')
      || url.includes('status')
      || url.includes('public')
      || url.includes('register')
      || url.includes('dashboard')
      || url.includes('apidoc')
      || url.includes('login') || req.url==='/') {
      next();
    } else {
      /**
       * Decode user from token and add to request if request has a valid token
       */
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
          if (err) {
            // console.log(err)
            return res.status(403).send({success: false, message: err.message});

          } else {
            // if everything is good, save to request for use in other routes
            req.user = decoded;
            // console.log(decoded);
            next();
          }
        });
      } else {
        /**
         * Return 403 - Forbidden status if there's no token or token is valid
         */
        return res.status(403).send({
          success: false,
          message: 'You are not allowed access',
          reason: 'No token provided.'
        });
      }
    }
  },

  /**
   * Sign User - Generate token for user
   * @param {Object} user - The user object
   */
  signUser(user) {
    return jwt.sign(helper.signUser(user), config.jwtSecret);
  },
  



}