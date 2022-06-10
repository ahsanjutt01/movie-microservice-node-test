const joi = require("joi");
const Boom = require("boom");

const movieService = require("../services/movie.service");

const get = {
  method: "GET",
  path: "/movies",
  config: {
    tags: ["api"],
    description: "Get all movies",
    notes: "Get all movies",
    plugins: {
      // Swagger model definition
      "hapi-swagger": {
        responses: {
          200: {
            description: "Success",
            // TODO return an array of movies
          },
          500: { description: "Internal Error" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    try {
      let result = await movieService.getAll();
      // return reply() is best practice https://github.com/hapijs/hapi/issues/2168
      return reply(result);
    } catch (error) {
      if (error === "NOT_FOUND") {
        return reply(Boom.notFound());
      } else {
        return reply(new Error(error));
      }
    }
  },
};

const post = {
  method: "POST",
  path: "/movie",
  config: {
    tags: ["api"],
    description: "Create a new movies",
    notes: "Create a new movies",
    plugins: {
      // Swagger model definition
      "hapi-swagger": {
        responses: {
          200: {
            description: "Success",
            schema: { name: "", description: "" },
          },
          400: { description: "Bad request" },
          500: { description: "Internal Error" },
        },
      },
    },
    validate: {
      //   options: {
      //     allowUnknown: false,
      //   },
      payload: {
        name: joi.string().required(),
        description: joi.string().required(),
        releaseDate: joi.date().required(),
        duration: joi.string().required(),
        genre: joi.string().required(),
        rating: joi.number().required(),
      },
    },
  },
  handler: async (request, reply) => {
    try {
      console.log("request.payload => ", request);
      let payload = request.payload;
      let result = await movieService.add(payload);
      return reply(result);
    } catch (error) {
      console.log(error);
      return reply(new Error(error));
    }
  },
};

const getMovieById = {
  method: "GET",
  path: "/movie/{id}",
  config: {
    tags: ["api"],
    description: "Get movie by movieId",
    notes: "Get movie by movieId",
    plugins: {
      // Swagger model definition
      "hapi-swagger": {
        responses: {
          200: {
            description: "Success",
          },
          400: { description: "Bad request" },
          404: { description: "Movie does not exist" },
          500: { description: "Internal Error" },
        },
      },
    },
    validate: {
      params: {
        id: joi.string(),
      },
    },
  },
  handler: async (request, reply) => {
    // return reply() is best practice https://github.com/hapijs/hapi/issues/2168
    try {
      const result = await movieService.getMovieById(request.params.id);
      return reply(result);
    } catch (err) {
      if (err === "NOT_FOUND") {
        return reply(Boom.notFound());
      } else {
        return reply(new Error(err));
      }
    }
  },
};

const del = {
  method: "DELETE",
  path: "/moive/{id}",
  config: {
    tags: ["api"],
    description: "Delete an moive",
    notes: "Delete an moive by moiveId",
    plugins: {
      // Swagger model definition
      "hapi-swagger": {
        responses: {
          204: { description: "Success" },
          404: { description: "Moive does not exist" },
          500: { description: "Internal Error" },
        },
      },
    },
    validate: {
      params: {
        id: joi.string(),
      },
    },
  },
  handler: async (request, reply) => {
    // return reply() is best practice https://github.com/hapijs/hapi/issues/2168
    try {
      const result = genreService.del(request.params.id);

      return reply().code(204);
    } catch (err) {
      switch (err) {
        case "NOT_FOUND":
          reply(Boom.notFound());
          break;
        default:
          reply(new Error(err));
      }
    }
  },
};

module.exports = {
  routes: [get, getMovieById, post, del],
  get,
  getMovieById,
  post,
  del,
};
