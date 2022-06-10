const mongoose = require("mongoose");
const logger = require("../logger/index");
const Movie = require("../models/movie");

require("../config/database");

const movieService = {
  add: async (movie) => {
    try {
      logger.info("Adding a new movie: " + JSON.stringify(movie));
      const newMovie = new Movie(movie);
      const savedMovie = await newMovie.save();
      return savedMovie;
    } catch (error) {
      logger.info("error ", error);
    }
  },
  getAll: async () => {
    logger.info("Retrieving all movies");
    const data = await Movie.find().populate("genre");
    if (data) {
      return data; // fulfilled successfully
    } else {
      logger.warn("No movies are found");
      return data;
    }
  },
  /**
   * @param  {Number} movieId movie id
   */
  getMovieById: function (movieId) {
    try {
      logger.info("Retrieving movie with movieId: " + movieId);
      const movie = Movie.findById(movieId);
      return movie;
    } catch (error) {
      logger.error("error => ", error);
    }
  },
  del: async (movieId) => {
    try {
      logger.info("Deleting movie with movieid: " + movieId);
      // find the employee
      const movie = await Movie.deleteOne({ _id: movieId });
      if (typeof movie === "undefined") {
        logger.warn(`Movie with movieid: ${movieid} is not found`);
        reject("NOT_FOUND");
        return;
      }
      return movie;
    } catch (error) {
      logger.error("error => ", error);
    }
  },
};

module.exports = movieService;
