import { expect } from "chai";

const service = require("../services/movie.service");
const genreService = require("../services/genre.service");

const movie = {
  id: "",
  name: "Action",
  description: "Action type movies listed in this genre",
  releaseDate: new Date(),
  duration: "1:45",
  rating: "4",
  genre: "",
};

const genre = {
  id: "",
  name: "Action",
  description: "Action type movies listed in this genre",
};

describe("Movie Service Unit Tests", () => {
  describe("Save Moive functionality", () => {
    it("should successfully add a movie", async () => {
      const newGenre = await genreService.add(genre);
      movie.genre = newGenre._id;
      const newMovie = await service.add(movie);
      movie.id = newMovie._id;
      expect(newMovie.name).to.equal(movie.name);
      expect(newMovie.description).to.equal(movie.description);
    });

    it("successfully get movie by id", async () => {
      const newMovie = await service.getMovieById(movie.id);
      expect(newMovie.name).to.equal(movie.name);
      expect(newMovie.description).to.equal(movie.description);
      expect(newMovie.duration).to.equal(movie.duration);
      expect(newMovie.rating).to.equal(movie.rating);
    });

    it("successfully getAll movies", async () => {
      const newMovie = await service.getAll();
      expect(newMovie.length).to.equal(1);
      expect(newMovie[0].genre.name).to.equal(genre.name);
      expect(newMovie[0].genre.description).to.equal(genre.description);
    });

    it("successfully delete movies", async () => {
      await genreService.del(movie.genre);
      const newMovie = await service.del(movie.id);
      expect(newMovie.acknowledged).to.equal(true);
      expect(newMovie.deletedCount).to.equal(1);
    });
  });
});
