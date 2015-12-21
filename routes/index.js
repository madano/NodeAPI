var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');
var registerUsers = require('./registerUsers.js');
var retrievePosts = require('./retrievePosts.js');
var addPost = require('./addPost.js');
var addPostInteraction = require('./addPostInteraction.js');
var getUserInteractions = require('./retrieveUserInteractions.js');
var loginUser = require('./loginUser.js');
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/addUserWithTwitter', registerUsers.addUserWithTwitter);
router.post('/getTwitterPosts', retrievePosts.getTwitterPosts);
router.post('/addTwitterPost', addPost.addTwitterPost);
router.post('/addTwitterPostInteraction', addPostInteraction.addTwitterPostInteraction);
router.post('/getTwitterPostInteractions', getUserInteractions.getTwitterPostInteractions);
router.post('/loginUserWithTwitter', loginUser.loginUserWithTwitter);
router.post('/addCoinsToUser', loginUser.addCoinsToUser);
router.post('/getCoinsForUser', loginUser.getCoinsForUser);
//router.post('/registerFacebook', auth.login);
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
