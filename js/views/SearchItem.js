import View from "./View.js";
class SearchItemView extends View {
  get _parentEl() {
    return document.querySelectorAll(".search__results__item");
  }
  _errorMessage = "Not found, Please type correct dog breed ;)";

  addHandlerResult() {
    this._parentEl.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const url = new URL(
          window.location.hash.slice(1),
          window.location.origin
        );
        url.searchParams.set("breed", e.target.id);
        window.location.hash = "#" + "/breeds" + url.search;
      });
    });
  }

  _generateMarkup() {
    return /* html */ `
    <li class="search__results__item" id="${this._data}">  <p id='${
      this._data
    }' class="search__results__text p">${
      this._data.charAt(0).toUpperCase() + this._data.slice(1)
    }</p><input type="hidden" id="searchResult" name="breed" value="${
      this._data
    }" />
    </li>
   `;
  }
}
export default new SearchItemView();
