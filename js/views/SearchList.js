import View from "./View.js";
import SearchItemView from "./SearchItem.js";
const test = document.querySelector(".search__results");
const error = document.querySelector(".error");
class SearchListView extends View {
  get _parentEl() {
    return document.querySelector(".search__results");
  }
  _errorMessage = "Not found, Please type correct dog breed ;)";
  _generateMarkup() {
    return this._data
      .map((data, i) => SearchItemView.render(data, i, false))
      .join("");
  }
}

export default new SearchListView();
