export default class View {
  _data;
  // Function for rendering loading spinner
  renderHeadline(headlineData) {
    const h1El = document.querySelector("h1");
    h1El.innerHTML =
      headlineData.charAt(0).toUpperCase() + headlineData.slice(1);
  }
  // Function for rendering app markups
  render(data, i, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup(i);
    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="/img/symbol-defs.svg#icon-spinner3""></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <p class="p">${message}</p>
          </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
