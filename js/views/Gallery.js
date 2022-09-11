export const markupGallery = (
  data,
  i
) => /* html */ ` <figure class="card card--${i + 1} " id="${data}">
  <img class="card__img" src="${data}"/>
  <button class="like">&#9829;</button>
  </figure>`;

export const markupBreed = (data) => /* html */ `
  <div class="breed-title h2"><p>${
    data.charAt(0).toUpperCase() + data.slice(1)
  }</p>
  </div>
  `;
