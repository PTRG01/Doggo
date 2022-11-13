import View from "./View.js";
import * as model from "../models/model.js";

class CardView extends View {
  get _parentEl() {
    "";
  }
  get _imgEl() {
    return document.querySelectorAll(".card__img");
  }
  get _bookmarkEl() {
    return document.querySelectorAll(".like");
  }
  toggleBookmark(parent) {
    parent.classList.toggle("bookmark");
  }

  addHandlerBookmark() {
    this._bookmarkEl.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.className === "like") {
          const data = e.target.id;
          model.breedModel.addBookmark(data);
          this.toggleBookmark(e.target);
        } else if (e.target.className === "like bookmark") {
          const data = e.target.id;
          this.toggleBookmark(e.target);
          model.breedModel.removeBookmark(data);
        }
      });
    });
  }

  _generateMarkup() {
    const id = window.location.hash.slice(9);
    return /* html */ ` <figure class="card card--${this._i + 1} " id="${id}">
  <img class="card__img" src="${this._data}"/>
  </figure>`;
  }

  generateCard(data, i) {
    const id = window.location.hash.slice(9);
    let bookmark;
    if (model.breedModel.bookmarks.includes(data)) {
      bookmark = " bookmark";
    } else bookmark = "";
    return /* html */ ` <figure class="card card--${i + 1} " id="${id}">
  <img class="card__img" src="${data}"/>
  <button class="like${bookmark}" id="${data}">&#9829;</button>
  </figure>`;
  }
}

export default new CardView();
