import { createRequest } from "./ApiRequest";
var _user = createRequest("/user");
var _movie = createRequest("/movie");
_movie.list = (profileId) => {
  return _movie.get(`/list/${profileId}`);
};
_movie.suggestion = (profileId) => {
  return _movie.get(`/suggestion/${profileId}`);
};
_movie.watched = (id) => {
  return _movie.put(`/${id}/watched`);
};
var _profile = createRequest("/profile");
_profile.main = (model) => {
  return _profile.put(`/${model.id}/main`, model);
};
var _notification = createRequest("/notification");
var _reminder = createRequest("/reminder");
export const $user = _user;
export const $movie = _movie;
export const $profile = _profile;
export const $notificaition = _notification;
export const $reminder = _reminder;
