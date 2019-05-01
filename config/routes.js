import express from 'express';
import auth from "../app/controllers/auth";
import admins from "../app/controllers/admins";

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
   * Auth routes
   */
  router.post('/auth/login/buyer', auth.buyerLogin);
  router.post('/auth/login/seller', auth.sellerLogin);
  router.post('/auth/login/admin', auth.adminLogin);

  // admin routes
  router.get('/admins', admins.list);
  router.post('/admins', admins.create);
  router.get('/admins/:adminId', admins.details);
  router.put('/admins/:adminId', admins.update);
  router.delete('/admins/:adminId', admins.deleteAdmin);

  
  return router;
}