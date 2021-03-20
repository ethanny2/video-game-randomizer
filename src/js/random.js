import "../sass/styling.scss";
import Packery from "packery";
let grid;

window.addEventListener("DOMContentLoaded", () => {
  generateImages();
  let loader = document.getElementById("lds-default");
  const offset = 10;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - offset) {
      console.log("Loading more infinite images");
      loader.style.display = "initial";
      generateImages();
    }
  });
  // $(".modal").on("click", function (e) {
  //   //Prevent event from bubbling up any further
  //   e.preventDefault();
  //   e.stopPropagation();
  //   e.stopImmediatePropagation();
  //   return false;
  // });
});
async function generateImages() {
  var request = await fetch("http://localhost/game-randomizer-portfolio-update/src/php/queryForImages.php", {
    /* Needed for online hosting*/
    //	url: '../php/queryForImages.php',
    /* For local testing*/
    // url: "http://localhost/game-randomizer-portfolio-update/src/php/queryForImages.php",
    // type: "POST"
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  });
  if (request.ok) {
    const data = await request.json();
    console.log({ data });
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
  //Add 10 images to each row.
  $.each(links, function (_, value) {
    if (value) {
      const gridItem = $("<div></div>");
      const image = $("<img src=" + value.cover + " />");
      gridItem.addClass("grid-item");
      gridItem.append(image);
      gridItem.on("click", (e) => {
        // if modal is not displayed; show modal prevent bubble
        // if modal is displayed; let event bubble to body
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log("Grid item clicked");
        //If modal is visible close 
        modal.style.display = "initial";
        modal.classList.add("fade-in");
        $(modal).html(`
        <h1>${value.name}</h1>
        <div class="modal__contents">
          <div class="modal__image">
            <img src="${value.cover}" alt="${value.name}" />
          </div>
          <div class="modal__time">
            <p>Main Story: ${value.main_story || "N/A"}</p>
            <p>Completionist: ${value.completionist || "N/A"}</p>
            <p>Average: ${value.combined || "N/A"}</p>
          </div>
          <div class="modal__info">
            <p>Release Date: ${value.release_data}</p>
            <p>Platforms: ${value.platforms}</p>
            <p>Average Score: ${value.rating || "N/A"} </p>
            <p>Summary: ${value.summary || "N/A"}</p>
            <a href="${value.url}">Giant Bomb Page</a>
          </div>
        </div>`);
        return false;
      });
      image.on("load", () => {
        if (loader.style.display !== "none") loader.style.display = "none";
        //Send it into the packery grid.
        $(".first_page #grid").append(gridItem);
        grid.appended(gridItem);
        grid.layout();
      });
    }
  });
}
