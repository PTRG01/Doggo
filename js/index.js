import * as model from "./model.js";
import * as helpers from "./helpers.js";
import DATA from "../data/data.js";
import { markupForm } from "./views/Form.js";
import { markupGallery } from "./views/Gallery.js";
import { markupBreed } from "./views/Gallery.js";
import { markupSearch } from "./views/Search.js";
import * as searchView from "./views/Search.js";
import { render } from "./helpers.js";

const form = document.querySelector(".form");
const formList = document.querySelector(".form__select");
const gallery = document.querySelector(".gallery");
const search = document.querySelector(".search");
const searchField = document.querySelector(".search__field");
const searchList = document.querySelector(".search__results");
const searchItem = document.querySelector(".search__results__item");
const placeholder = document.getElementById(".placeholder");
const photoCount = document.querySelector(".number__field");
const bookmarks = document.querySelector(".bookmarks");
const bookmarksButton = document.querySelector(".btn__bookmarks");

// props => <div></div>
// pobieraszDane->renderujeszForm->dajeszListenerDoForma->naSubmitFormaPobieraszZdjęciaRasy->renderujeszListęZdjęć

let count = 5;
let id;

const loadBookmarks = async function (id = "affenpinscher", count = 5) {
  try {
    const markup = model.breedModel.bookmarks
      .slice(0, count)
      .map((images, i) => markupGallery(images, i))
      .join("");

    console.log(model.breedModel.bookmarks);
    helpers.clear(bookmarks);
    helpers.render(bookmarks, "beforeend", markup);
    controlBookmarks(bookmarks);
    return;
  } catch (err) {
    console.error(err);
  }
};

const controlBookmarks = function (parent) {
  parent.addEventListener("click", function (e) {
    e.preventDefault();
    const like = e.target.closest(".like");
    const card = e.target.closest(".card");
    if (e.target.className === "like") {
      const data = card.id;
      model.breedModel.addBookmark(data);
      like.classList.add("bookmark");
      loadBookmarks();
    } else if (e.target.className === "like bookmark") {
      const data = card.id;
      model.breedModel.removeBookmark(data);
      like.classList.remove("bookmark");
    }
  });
};

const displayBookmarks = function () {
  bookmarksButton.addEventListener("click", function (e) {
    e.preventDefault();
    bookmarks.classList.toggle("hidden");
    gallery.classList.toggle("hidden");
  });
};

const loadGallery = async function (id = "affenpinscher", count = 5) {
  try {
    helpers.render(gallery, "afterbegin", markupBreed(id));
    const markup = model.breedModel.breedImages[id]
      .slice(0, count)
      .map((images, i) => markupGallery(images, i))
      .join("");
    helpers.render(gallery, "beforeend", markup);
    controlBookmarks(gallery);
    return;
  } catch (err) {
    console.error(err);
  }
};

const controlCount = function () {
  photoCount.addEventListener("change", function (e) {
    e.preventDefault();
    count = e.target.value;
    console.log(count);
    console.log(id);
    if (id !== undefined) {
      helpers.clear(gallery);
      loadGallery(id, count);
    }
  });
};

const loadForm = async function (breeds) {
  try {
    model.breedModel.loadStaticData(DATA);
    const markup = model.breedModel.breeds
      .map((breeds) => markupForm(breeds))
      .join("");

    helpers.render(formList, "afterbegin", markup);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = formData.get("dogs");
      helpers.clear(gallery);
      loadGallery(data, count);
      id = data;
      console.log(id);
    });
  } catch (err) {
    console.error;
  }
};

const addHandlerSearch = function () {
  search.addEventListener("submit", function (e) {
    e.preventDefault();
    helpers.clear(gallery);
    const query = searchView.getQuery(search, ".search__field");
    if (!query) return;
    if (model.breedModel.breeds.includes(query)) {
      loadGallery(query, count);
    } else console.log("Type correct dog breed");
  });
};

const renderSearchResults = async function (searchText, parent) {
  try {
    let query;
    helpers.clear(searchList);
    if (searchText !== undefined) {
      helpers.clear(searchList);
      searchText.forEach((searchText) =>
        helpers.render(searchList, "afterbegin", markupSearch(searchText))
      );
    }
    searchList.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        e.target.className === "search__results__item" ||
        "search__results__text"
      ) {
        let query = e.target.id;
        helpers.clear(gallery);
        loadGallery(query, count);
        id = query;
        console.log(id);
      } else {
        return;
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const loadSearchResults = function () {
  window.addEventListener("load", () => {
    const breeds = model.breedModel.breeds;
    let breedName;

    searchField.onkeyup = () => {
      let query = searchField.value.toLowerCase();
      const result = async function (data) {
        await data;
        if (data.length >= 3) {
          breedName = breeds.filter((element) => element.includes(data));
          return breedName;
        } else {
          helpers.clear(searchList);
          return;
        }
      };
      result(query);
      renderSearchResults(breedName);
    };
  });
};

helpers.clear(formList);
loadForm();
addHandlerSearch();
loadSearchResults();
controlCount();
displayBookmarks();
