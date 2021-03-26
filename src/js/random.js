import "../sass/styling.scss";
import Packery from "packery";
import { throttle } from "lodash";
let grid;
let throttledGenerateImages = throttle(generateImages, 1500);

window.addEventListener("DOMContentLoaded", () => {
  generateImages();
  let loader = document.getElementById("lds-default");
  const offset = 10;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - offset) {
      loader.style.display = "initial";
      throttledGenerateImages();
    }
  });
  $("body").on("click", (e) => {
    const isModalClicked = e.target.parentNode.className.split(" ").some((classVal) => classVal.includes("modal"));
    if (!isModalClicked) {
      $(".modal").removeClass("fade-in");
      $("section").removeClass("unfocus");
    }
  });

  $("body").on("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.activeElement.click();
      document.getElementsByClassName("gameUrl")[0].focus();
    }
  });
});
async function generateImages() {
  var request = await fetch("https://boiling-inlet-32336.herokuapp.com/random", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  });
  if (request.ok) {
    const data = await request.json();
    if (data.length) {
      appendImages(data);
      return true;
    }
  }
}

function appendImages(links) {
  const gridElem = document.getElementById("grid");
  const loader = document.getElementById("lds-default");
  const modal = document.getElementsByClassName("modal")[0];
  grid = new Packery(gridElem, {
    columnWidth: ".grid-sizer",
    itemSelector: ".grid-item",
    percentPosition: true,
    resize: true,
    initLayout: true
  });
  $.each(links, function (_, value) {
    if (value) {
      const gridItem = $(`<div tabindex="0"></div>`);
      const image = new Image();
      image.onload = function () {
        if (loader.style.display !== "none") loader.style.display = "none";
        //Send it into the packery grid.
        $(".first_page #grid").append(gridItem);
        grid.appended(gridItem);
        grid.layout();
      };
      image.src = value.cover;
      image.alt = value.name;
      gridItem.addClass("grid-item");
      gridItem.append(image);
      gridItem.on("click", (e) => {
        const isModalDisplayed = $(".modal").hasClass("fade-in");
        // if modal is not displayed; show modal prevent bubble
        if (!isModalDisplayed) {
          $(".modal").addClass("fade-in");
          $("section").addClass("unfocus");
          $(modal).html(`
        <p class="cutoff cutoff--sm title">${value.name}</p>
        <div class="modal__contents">
          <div class="modal__image">
            <img src="${value.cover}" alt="${value.name}" />
          </div>
          <div class="modal__time">
            <p>Main Story: ${value.main_story || "N/A"}</p>
            <p>Completionist: ${value.completionist || "N/A"}</p>
            <p class="cutoff cutoff--md">Summary: ${value.summary || "N/A"}</p>
          </div>
          <div class="modal__info">
            <p>Release Date: ${value.release_data}</p>
            <p class="cutoff cutoff--lg">Platforms: ${value.platforms}</p>
            <p>Average Score: ${value.rating || "N/A"} </p>
        
            <a class="gameUrl"  tabindex="0" rel="noopener" target="_blank" href="${value.url}">Giant Bomb Page</a>
          </div>
        </div>`);
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      });
    }
  });
}
