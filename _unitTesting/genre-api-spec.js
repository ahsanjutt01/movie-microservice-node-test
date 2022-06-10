import { expect } from "chai";

const service = require("../services/genre.service");

const genre = {
  id: "",
  name: "Action",
  description: "Action type movies listed in this genre",
};

describe("Genre Service Unit Tests", () => {
  describe("Save Genre functionality", () => {
    it("should successfully add a genre", async () => {
      const newGenre = await service.add(genre);
      genre.id = newGenre._id;
      expect(newGenre.name).to.equal(genre.name);
      expect(newGenre.description).to.equal(genre.description);
    });

    it("successfully get genre by id", async () => {
      const newGenre = await service.getGenreById(genre.id);
      expect(newGenre.name).to.equal(genre.name);
      expect(newGenre.description).to.equal(genre.description);
    });

    it("successfully getAll genres", async () => {
      const newGenre = await service.getAll();
      expect(newGenre.length).to.equal(1);
    });

    it("successfully delete genres", async () => {
      const newGenre = await service.del(genre.id);
      expect(newGenre.acknowledged).to.equal(true);
      expect(newGenre.deletedCount).to.equal(1);
    });
  });
});
