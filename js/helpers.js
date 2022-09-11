export const render = function (parent, place, markup) {
  parent.insertAdjacentHTML(place, markup);
};

export const clear = function (parent) {
  parent.innerHTML = "";
};

export const addListener = function (parent) {};
