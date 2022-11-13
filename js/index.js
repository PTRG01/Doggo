import data from "../data/data.js";
import router from "./router.js";

const loadHash = () => {
  const pageUrl = window.location.hash.replace("#", "");

  router.handlePage(pageUrl);
};

window.addEventListener("hashchange", loadHash);
loadHash();
