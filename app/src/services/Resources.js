import ApiRequest from './ApiRequest';
var _user = ApiRequest.createRequest('/user');
var _movie = ApiRequest.createRequest('/movie');
_movie.list = (profileId) => {
  return _movie.get(`/${profileId}/list`);
}
var _profile = ApiRequest.createRequest('/profile');
_profile.main = (model) => {
  return _profile.put(`/main/${model.id}`, model);
}
_profile.watched = (id) => {
  return _profile.put(`/watched/${id}`);
}
var _notification = ApiRequest.createRequest('/notification');
var _reminder = ApiRequest.createRequest('/reminder');
export const $user = _user;
export const $movie = _movie;
/* 
ADD CACHE TO MOVIE SEARCH
, {
  cache: {
    maxAge: 30 * 60 * 1000
  }
*/
export const $profile = _profile;
export const $notificaition = _notification;
export const $reminder = _reminder;
