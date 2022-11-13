import View from "./View.js";
const form = document.querySelector(".form");

class FormView extends View {
  _parentEl = document.querySelector(".form__select");
  _errorMessage = "No recipes found for your query! Please try again ;)";
  _generateMarkup() {
    return this._data
      .map(
        (breeds) =>
          `<option class="option" value="${breeds}"><a href="${breeds}">${breeds}</a></option>`
      )
      .join("");
  }

  addHandlerForm() {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(e);
      const formData = new FormData(form);
      const data = formData.get("dogs");
      window.location.hash = data;
    });
  }
}
export default new FormView();
