const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const {
  db
} = require('./util/admin');

const {
  login,
  signup,
  uploadImage,
  getUserDetails,
  getAuthenticatedUser,
  getUserFavAlbums
} = require('./handlers/users');

const {
  getAllAlbums,
  addOneAlbum,
  addRating,
  getOneAlbum,
  getAlbumRatings,
  getUserAlbumRating,
  getAllReviews,
  getAlbumReviews,
  addAlbumReview,
  favAlbum,
  addListenLater,
  addListened
} = require('./handlers/albums');


// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.get('/user/:handle', getUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle/favAlbums', getUserFavAlbums);


//album routes
app.get('/albums', getAllAlbums);
app.post('/album', addOneAlbum);
app.get('/album/:artist/:name', getOneAlbum);

app.post('/album/:artist/:name/rating', FBAuth, addRating);
app.get('/album/:artist/:name/ratings', getAlbumRatings);
app.get('/album/:artist/:name/rating/:user', getUserAlbumRating);

app.get('/reviews', getAllReviews);
app.get('/album/:artist/:name/reviews', getAlbumReviews);
app.post('/album/:artist/:name/review', FBAuth, addAlbumReview);

app.post('/album/:artist/:name/fav', FBAuth, favAlbum);
app.post('/album/:artist/:name/heard', FBAuth, addListened);
app.post('/album/:artist/:name/listenLater', FBAuth, addListenLater);


exports.api = functions.https.onRequest(app);