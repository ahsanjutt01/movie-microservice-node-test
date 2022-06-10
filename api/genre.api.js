const joi = require("joi");
const Boom = require("boom");

const genreService = require("../services/genre.service");

const get = {
  method: "GET",
  path: "/genres",
  config: {
    tags: ["api"],
    description: "Get all genres",
    notes: "Get all genres",
    plugins: {
      // Swagger model definition
      "hapi-swagger": {
        responses: {
          200: {
            description: "Success",
            // TODO return an array of genres
            // schema: joi.object(Genre.schema()).label("Genre"),
          },
          500: { description: "Internal Error" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    try {
      let result = await genreService.getAll();
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
  path: "/genre",
  config: {
    tags: ["api"],
    description: "Create a new genres",
    notes: "Create a new genres",
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
      },
    },
  },
  handler: async (request, reply) => {
    try {
      console.log("request.payload => ", request);
      let payload = request.payload;
      let result = await genreService.add(payload);
      return reply(result);
    } catch (error) {
      console.log(error);
      return reply(new Error(error));
    }
  },
};

const getGenreById = {
  method: "GET",
  path: "/genre/{id}",
  config: {
    tags: ["api"],
    description: "Get genre by genreId",
    notes: "Get genre by genreId",
    plugins: {
      // Swagger model definition
      "hapi-swagger": {
        responses: {
          200: {
            description: "Success",
          },
          400: { description: "Bad request" },
          404: { description: "Genre does not exist" },
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
      const result = await genreService.getGenreById(request.params.id);
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
  path: "/genre/{id}",
  config: {
    tags: ["api"],
    description: "Delete an genre",
    notes: "Delete an genre by genreId",
    plugins: {
      // Swagger model definition
      "hapi-swagger": {
        responses: {
          204: { description: "Success" },
          404: { description: "Genre does not exist" },
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
  routes: [get, getGenreById, post, del],
  get,
  getGenreById,
  post,
  del,
};
