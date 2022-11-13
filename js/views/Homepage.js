import View from "./View.js";

class HomepageView extends View {
  get _parentEl() {
    return document.querySelector(".app");
  }
  _generateMarkup() {
    return /* html */ `
    <header class="header">
    <img class="logo" src="./img/DoggoLogo.png" alt="Doggo Logo" />
    <h1 class="heading-title">Hello, Please search for a dog breed</h1>
    <nav class="nav">
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
      </form>
    </nav>
  </header>
  <main class="main">
    <div class="gallery">
    
    </div>
    <div class="bookmarks hidden"></div>
  </main>
`;
  }
}
export default new HomepageView();
