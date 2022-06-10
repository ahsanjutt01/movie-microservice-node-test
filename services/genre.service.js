const logger = require("../logger/index");
const Genre = require("../models/genre");

require("../config/database");

const genreService = {
  add: async (genre) => {
    try {
      logger.info("Adding a new genre: " + JSON.stringify(genre));
      const newGenre = new Genre(genre);
      const savedgenre = await newGenre.save();
      return savedgenre;
    } catch (error) {
      logger.info("error ", error);
      return null;
    }
  },
  getAll: async () => {
    logger.info("Retrieving all genres");
    const data = await Genre.find().select("-__v");
    if (data) {
      return data; // fulfilled successfully
    } else {
      logger.warn("No genre are found");
      return data;
    }
  },
  /**
   * @param  {Number} genreId genre id
   */
  getGenreById: function (genreId) {
    try {
      logger.info("Retrieving genre with genreId: " + genreId);
      const genre = Genre.findById(genreId);
      return genre;
    } catch (error) {
      logger.error("error => ", error);
    }
  },
  del: async (genreId) => {
    try {
      logger.info("Deleting genre with genreid: " + genreId);
      // find the employee
      const genre = await Genre.deleteOne({ _id: genreId });
      if (typeof genre === "undefined") {
        logger.warn(`Genre with genreid: ${genreid} is not found`);
        reject("NOT_FOUND");
        return;
      }
      return genre;
    } catch (error) {
      logger.error("error => ", error);
    }
  },
};

module.exports = genreService;
