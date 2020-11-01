var express = require('express');
var router = express.Router();
const authSuperAdminController = require("../../controllers/userprofile/superAdminController");
var auth = require('../../../middleware/auth')


  // /api/superadmin/auth
  router.put("/",authSuperAdminController.loggedinuser);
  router.get("/all",authSuperAdminController.allusers);
  router.post("/signup",authSuperAdminController.signup);
  router.post("/login",authSuperAdminController.login);
  router.get("/logout",authSuperAdminController.logout);

module.exports = router;
