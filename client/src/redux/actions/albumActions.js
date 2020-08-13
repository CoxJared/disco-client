import {
  SET_ABLUM,
  ADD_ALBUM,
  LOADING_ALBUM,
  LOADING_UI,
  SET_ALBUM,
  STOP_LOADING_UI,
  SET_ERRORS,
  SET_RATING,
  SET_RATINGS
} from '../types';
import axios from 'axios';

export const getAlbum = (album) => (dispatch) => {
  dispatch({
    type: LOADING_ALBUM
  });
  axios.get(`album/${album.artist}/${album.name}`)
    .then(response => {
      dispatch({
        type: SET_ALBUM,
        payload: response.data
      });
      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch(err => console.log(err));
};

export const getAlbumRatings = (album) => (dispatch) => {
  axios.get(`album/${album.artist}/${album.name}/ratings`)
    .then(response => {
      dispatch({
        type: SET_RATINGS,
        payload: response.data
      })
    })
}

export const addAlbum = (newAlbum) => (dispatch) => {
  dispatch({
    type: LOADING_ALBUM
  });
  axios.post('/album', newAlbum)
    .then((response) => {
      dispatch({
        type: SET_ALBUM,
        payload: response.data
      })
    })
    .catch(err => {
      console.error(err);
    });
};

export const addRating = (albumRating) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios.post('/album/rating', albumRating)
    .then((response) => {
      dispatch({
        type: SET_RATING,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const getUserAlbumRating = (album, userHandle) => (dispatch) => {
  console.log('get user rat')
  console.log(`/album/${album.artist}/${album.name}/rating/${userHandle}`);
  axios.get(`/album/${album.artist}/${album.name}/rating/${userHandle}`)
    .then((response) => {
      dispatch({
        type: SET_RATING,
        payload: response.data
      })
    })
    .catch(err => {
      console.error(err);
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: err.response.data
      // })
    })
}