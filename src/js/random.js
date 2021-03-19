import "../sass/styling.scss";
import Packery from "packery";
let grid;

window.addEventListener("DOMContentLoaded", () => {
  generateImages();
  let loader = document.getElementById("lds-default");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      console.log("Loading more infinite images");
      loader.style.display = "initial";
      generateImages();
    }
  });
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
      const image = $("<img src=" + value + " />");
      gridItem.addClass("grid-item");
      gridItem.append(image);
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
