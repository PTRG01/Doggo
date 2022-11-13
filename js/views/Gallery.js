import View from "./View.js";
import CardView from "./Card.js";
import { breedModel } from "../models/model.js";
class GalleryView extends View {
  get _parentEl() {
    return document.querySelector(".gallery");
  }

  // _generateMarkup(count = 5) {
  //   let number = parseFloat(count);
  //   return this._data
  //     .slice(0, number)
  //     .map((breed, i) => CardView.render(breed, i, false))
  //     .join("");
  // }

  renderGallery(data, count = 5) {
    let number = parseFloat(count);
    let markup = data
      .slice(0, number)
      .map((breed, i) => CardView.generateCard(breed, i))
      .join("");
    return (this._parentEl.innerHTML = markup);
  }
}

export default new GalleryView();
