import View from "./View.js";

class BookmarkNavView extends View {
  get _parentEl() {
    return document.querySelector(".nav");
  }

  _generateMarkup() {
    return /* html */ `
    <div class="btn__cont">
    <h2>Clear Bookmarks</h2>
   
  <button class="btn btn__clear">
      <svg>
        <use href="./img/symbol-defs.svg#icon-cross"></use>
      </svg>
      </button>
      </a>
      </div>
    <div class="btn__cont">
    <h2>Gallery</h2>
    <a href="#/">
  <button class="btn btn__bookmarks">
      <svg>
        <use href="./img/symbol-defs.svg#icon-bookmark"></use>
      </svg>
      </button>
      </a>
      </div>
`;
  }
}
export default new BookmarkNavView();
