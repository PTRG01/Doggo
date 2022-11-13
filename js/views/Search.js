import { breedModel } from "../models/model.js";
import View from "./View.js";

class SearchView extends View {
  get _parentEl() {
    return document.querySelector(".search__field");
  }

  getQuery() {
    const query = this._parentEl.value;
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("keyup", function (e) {
      e.preventDefault();
      handler();
    });
  }
  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
