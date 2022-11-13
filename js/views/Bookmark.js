import View from "./View.js";
import CardView from "./Card.js";
import * as model from "../models/model.js";

class BookmarkView extends View {
  _errorMessage = "Not bookmarks found, Please add some ;)";

  get _parentEl() {
    return document.querySelector(".gallery");
  }
  get clearEl() {
    return document.querySelector(".btn__clear");
  }
  addHandlerClear() {
    this.clearEl.addEventListener("click", (e) => {
      model.breedModel.clearBookmarks();

      this._clear();
    });
  }

  _generateMarkup() {
    return this._data
      .map((breed, i) => CardView.render(breed, i, false))
      .join("");
  }
}
export default new BookmarkView();
