import { getJSON } from "../helpers.js";
import { API_URL } from "../config.js";
export const breedModel = {
  breeds: [],
  breedImages: {},
  results: {},
  bookmarks: [],
  // Loads static data from local file for test purposes
  loadStaticData(data) {
    const breedData = JSON.parse(data.breedList);
    const imagesData = JSON.parse(data.breedImages);
    this.breeds = Object.keys(breedData.message);
    this.breedImages = imagesData;
  },
  // Loads breed list by getJSON and stores it in breeds array
  async loadBreedList() {
    try {
      const data = await getJSON(`${API_URL}s/list/all`);
      this.breeds = Object.keys(data.message);
    } catch (err) {
      console.error(`${err} !!!!`);
      throw err;
    }
  },
  // Loads breed images by getJSON and stores it in breedsImages
  async loadBreedImages(breed) {
    try {
      const data = await getJSON(`${API_URL}/${breed}/images`);
      this.breedImages = data.message;
    } catch (err) {
      console.error(`${err} !!!!`);
      throw err;
    }
  },
  // Stores bookmark array to local storage
  persistBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(breedModel.bookmarks));
  },
  // Adds images to bookmark array
  addBookmark(data) {
    if (breedModel.bookmarks.includes(data)) return;
    breedModel.bookmarks.push(data);
    this.persistBookmarks();
  },
  // Removes images from bookmark array

  removeBookmark(data) {
    const index = breedModel.bookmarks.findIndex((el) => el.data === data);
    breedModel.bookmarks.splice(index, 1);
    this.persistBookmarks();
  },
  // Loads images from bookmark array

  loadBookmarks() {
    const storage = localStorage.getItem("bookmarks");
    if (storage) breedModel.bookmarks = JSON.parse(storage);
  },

  // Clears local storage
  clearBookmarks() {
    localStorage.clear("bookmarks");
    breedModel.bookmarks.length = 0;
  },
  // Filters search results and stores to array
  loadSearchResult(id) {
    const searchResult = breedModel.breeds.filter((result) =>
      result.includes(id.toLowerCase())
    );
    this.results = searchResult;
  },
};
