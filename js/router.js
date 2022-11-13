import data from "../data/data.js";
import * as model from "./models/model.js";
import HomepageView from "./views/Homepage.js";
import HomepageNavView from "./views/HomepageNav.js";
import BookmarkView from "./views/Bookmark.js";
import BookmarkNavView from "./views/BookmarkNav.js";
import SearchView from "./views/Search.js";
import SearchListView from "./views/SearchList.js";
import SearchItemView from "./views/SearchItem.js";
import GalleryView from "./views/Gallery.js";
import Gallery from "./views/Gallery.js";
import CardView from "./views/Card.js";

const router = {
  // Handle url params
  handlePage(pageName) {
    const params = new URL(pageName, window.location.origin);
    const keys = new URLSearchParams(params.search);
    let id = keys.get("breed");
    let count = keys.get("count");
    //  App routing, fallback for no count & wrong url
    if (count === null) count = 9;
    Object.keys(this.routes).includes(params.pathname)
      ? this.routes[params.pathname](id, count)
      : this.routes["/404"]();
  },

  routes: {
    "/404": function () {
      HomepageView.renderHeadline("Not found, sorry!");
      window.location.hash = "/";
    },
    "/": async function () {
      // Load breed list from API, render loading spinner
      GalleryView.renderSpinner();
      await model.breedModel.loadBreedList();
      // Generate page markups
      HomepageNavView.render(HomepageNavView._generateMarkup);
      HomepageView.render(HomepageView._generateMarkup);
      HomepageView.renderHeadline("Hello, Please search for a dog breed");
      // Query control, and list filtering, handling results display
      const controlSearch = function () {
        const query = SearchView.getQuery();
        if (!query || query.length <= 2) {
          SearchListView._clear();
          return;
        }
        model.breedModel.loadSearchResult(query);
        SearchListView.render(model.breedModel.results);
        SearchItemView.addHandlerResult();
      };
      // Handler for typing search input ( query)
      SearchView.addHandlerSearch(controlSearch);
    },

    "/bookmarks": function () {
      // Generate bookmark page markup
      BookmarkNavView.render(BookmarkNavView._generateMarkup);
      BookmarkView.renderHeadline("Bookmarks");
      // Load stored bookmarks
      model.breedModel.loadBookmarks();
      // Render bookmarks, add handler for clearing stored bookmarks
      BookmarkView.render(model.breedModel.bookmarks);
      BookmarkView.addHandlerClear();
    },
    "/breeds": async function (id, count = 9) {
      try {
        GalleryView.renderSpinner();
        // Loading search result image array from API
        await model.breedModel.loadBreedImages(id);
        // Loading bookmark data
        model.breedModel.loadBookmarks();
        // Rendering of image array as cards
        Gallery.renderGallery(model.breedModel.breedImages, count);
        // Rendering current breed name as headline
        BookmarkNavView.renderHeadline(id);
        // Handlers for number of photos displayed & storing bookmarks
        HomepageNavView.addHandlerCount();
        CardView.addHandlerBookmark();
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default router;
