import * as helpers from "../helpers.js";

export function getQuery(parent, element) {
  const query = parent.querySelector(element).value;
  if (query.length >= 3) {
    console.log(query);
    return query;
  }
}

export function getSearchResult(e) {
  e.preventDefault();
  if (
    e.target.className === "search__results__item" ||
    "search__results__text"
  ) {
    let query = e.target.id;
    console.log(query);
    return query;
  }
}

export const markupSearch = (data, i) =>
  /* html */ ` <li id="${data}" class="search__results__item"><p id='${data}' class="search__results__text h4">${
    data.charAt(0).toUpperCase() + data.slice(1)
  }</p></li>`;
