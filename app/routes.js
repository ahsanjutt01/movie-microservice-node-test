const genreApi = require("../api/genre.api");
const movieApi = require("../api/movie.api");

const register = (server) => {
  let routes = genreApi.routes;
  for (var i = 0; i < routes.length; i++) {
    server.route(routes[i]);
  }
  for (var i = 0; i < movieApi.routes.length; i++) {
    server.route(movieApi.routes[i]);
  }
};

module.exports = { register };
