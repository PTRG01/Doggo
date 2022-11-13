import View from "./View.js";

class HomepageNavView extends View {
  get _parentEl() {
    return document.querySelector(".nav");
  }
  get countEl() {
    return document.querySelector(".number__field");
  }
  addHandlerCount() {
    this.countEl.addEventListener("change", function (e) {
      e.preventDefault();
      const url = new URL(
        window.location.hash.slice(1),
        window.location.origin
      );
      url.searchParams.set("count", e.target.value);
      window.location.hash = "#" + url.pathname + url.search;
    });
  }
  _generateMarkup() {
    return /* html */ `
    <form class="search">
 
    <div class="search__cont">
      <input
        class="search__field"
        type="text"
        placeholder="Search for dog breeds..."
      />
      <ul class="search__results"></ul>
    </div>

    <input
      class="field number__field"
      type="number"
      min="1"
      max="9"
      step="1"
      value="9"
    />
  </form>
  <div class="btn__cont">
  <h2>Bookmarks</h2>
    <a href="#/bookmarks">
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

export default new HomepageNavView();
