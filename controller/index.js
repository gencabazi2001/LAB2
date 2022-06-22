
const express  = require('express'),
  router = express.Router(),
  magic = require('../util/magic'),
  users = require('../domain/services/service'),
  relations = require('../domain/services/relationService')
  
  router.post('/user/register', users.Register);
  router.get('/user/get/:UserID',users.GetUser);
  router.get('/users/get',users.GetUsers);
  router.put('/user/putDetails',users.AddDetails);
  router.put('/user/putSettings',users.AddSettings);
  router.post('/user/addTag',users.AddTag);
  router.post('/user/login',users.Login);
  //user Relation endpoints
  router.post('/follow/add',relations.AddFollow);
  router.post('/block/add',relations.AddBlock);
//admin endpoints
  router.post('/admin/terminate',users.TerminateUser)
  router.post('/admin/promote',users.PromoteUser)
  router.post('/admin/verifyUser',users.VerifyUser)
  module.exports = router