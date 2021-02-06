const Service = require("./Service");
const MovieRepository = require("../repository/MovieRepository");
const Movie = require("../models/Movie");
const TMDBService = require("./TMDBService");
const TokenService = require("./TokenService");

class MovieService extends Service {
  constructor() {
    super(MovieRepository, Movie);
  }

  validateCreate(model) {
    if (!model.movie) {
      throw Error("Movie is required");
    }
    if (!model.profile) {
      throw Error("Profile is required");
    }
    //User utils isDefined
    if (model.watched == "undefined" || model.watched == null) {
      model.watched = false;
    }
  }
  async create(model) {
    this.validateCreate(model);
    try {
      return await super.create(model);
    } catch (err) {
      return err;
    }
  }
  async getByMovie(id, profile) {
    let list = await super.search({ movie: id, profile: profile });
    return list.length ? list[0] : null;
  }
  async watched(req) {
    let id = req.params.id;
    let decoded = TokenService.decode(TokenService.getToken(req));

    let movie = await this.getByMovie(id, decoded.data);

    if (movie) {
      movie.watched = true;

      let updated = await super.update(movie);
      if (updated.watched) {
        return updated;
      }
    }
  }
  async populate(list) {
    let movies = await list.map(async (item) => {
      let movie = await TMDBService.movies.get(item.movie);
      movie.myData = item;
      return movie;
    });
    return await Promise.all(movies);
  }
  async myList(profile) {
    let list = await super.search({ profile: profile });
    let movies = await this.populate(list);
    return movies;
  }
}

module.exports = MovieService;
