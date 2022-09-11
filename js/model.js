import breedList from "../data/data.js";
import DATA from "../data/data.js";

export const breedModel = {
  breeds: [],
  breedImages: {},
  id: {},
  bookmarks: [],

  loadStaticData(data) {
    const breedData = JSON.parse(data.breedList);
    const imagesData = JSON.parse(data.breedImages);
    this.breeds = Object.keys(breedData.message);
    this.breedImages = imagesData;
    return;
  },

  addBookmark(data) {
    breedModel.bookmarks.push(data);
  },

  removeBookmark(data) {
    const index = breedModel.bookmarks.findIndex((el) => el.data === data);
    breedModel.bookmarks.splice(index, 1);
  },

  async getBreeds() {
    if (this.breeds && this.breeds.length) return this.breeds;

    // pobierasz z api i zwracasz
    return this.breeds;
  },

  // async loadDogs(url, id) {
  //   try {
  //     const data = await getDATA(url);
  //     state.breeds = Object.keys(data.message);
  //     console.log("Breeds Loaded");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
  async getBreedImage(breed = "") {
    return this.breedImages[breed];
  },

  // async loadImages(url, id) {
  //   try {
  //     const data = await getDATA(url);
  //     state.images = data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
};
