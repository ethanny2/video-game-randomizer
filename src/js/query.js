//Platform
let selectedPlats = [];
//Genre
let selectedGenres = [];
//Score
let selectedScores = [];
//time
let selectedTimes = [];
//Date
let selectedYears = [];

function clearData() {
  selectedPlats = [];
  selectedGenres = [];
  selectedScores = [];
  selectedTimes = [];
  selectedYears = [];
}

function uncheckInputs() {
  var inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    element.checked = false;
  }
}

function gatherButtonValues() {
  clearData();
  let platformButtons = $(".checkbox-list.platform input");
  let genreButtons = $(".checkbox-list.genre input");
  let scoreButtons = $(".checkbox-list.score input");
  let timeButtons = $(".checkbox-list.time input");
  let yearButtons = $(".checkbox-list.date input");
  $.each(platformButtons, function (_, value) {
    let tempJQ = $(value);
    let tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      selectedPlats.push(tempId);
    }
  });
  $.each(genreButtons, function (_, value) {
    let tempJQ = $(value);
    let tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      selectedGenres.push(tempId);
    }
  });
  $.each(scoreButtons, function (_, value) {
    let tempJQ = $(value);
    let tempId = tempJQ.attr("id");
    if (tempId !== "blank_rating") {
      //looks like 10% 19% remove percent signs
      tempId = tempId.replace(/%/g, "");
    } else {
      tempId = tempId.replace(/rating/g, "");
    }
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      selectedScores.push(tempId);
    }
  });
  $.each(timeButtons, function (_, value) {
    let tempJQ = $(value);
    let tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      selectedTimes.push(tempId);
    }
  });
  $.each(yearButtons, function (_, value) {
    let tempJQ = $(value);
    let tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      selectedYears.push(tempId);
    }
  });

  let data = {
    platformArray: selectedPlats,
    genreArray: selectedGenres,
    scoreArray: selectedScores,
    timeArray: selectedTimes,
    yearArray: selectedYears
  };
  sendSelectedData(data);
}

$(".run_button").on("click", function () {
  document.getElementsByClassName("game")[0].innerHTML = `
  <div class="game__title loading"></div>
  <div class="game__imgcontainer loading"></div>
  <div class="game__description loading"></div>`;
  gatherButtonValues();
});
$(".clear_button").on("click", uncheckInputs);

async function sendSelectedData(data) {
  let request = await fetch("https://boiling-inlet-32336.herokuapp.com/query", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!request.ok) {
    return;
  } else {
    const container = document.getElementsByClassName("game")[0];
    let formattedResponse = await request.json();
    container.innerHTML = "";
    if (!formattedResponse.Sorry) {
      const contents = `<h4 class="game__title">${formattedResponse.name}</h4>
      <h5 class="game__rating"><span class="bold">Rating: </span> ${
        formattedResponse.rating ? formattedResponse.rating : "N/A"
      }</h5>
      <div class="game__content">
        <div class="game__imgcontainer">
          <img src="${formattedResponse.cover}" alt="${formattedResponse.name} box art" />
        </div>
        <p class="release"><span class="bold">Release Date:</span> ${formattedResponse.releaseDate}</p>
        <h5>Links</h5>
        <div class="game__links loading"></div>
        <p class="summary">
          <span class="bold"> Summary: </span> ${formattedResponse.summary}
        </p>
        <p><span class="bold"> Time to Complete Main Story: </span> ${formattedResponse.main_story.replace("Â", "")}</p>
        <p><span class="bold"> Time to 100% complete:</span> ${formattedResponse.completionist} </p>
        <p><span class="bold"> Genres:</span>${formattedResponse.platforms.join(", ")}</p>
        <p><span class="bold"> Platforms: </span> ${formattedResponse.genres.join(", ")}</p>
        <p class="info">
          <span class="bold">Additional Info: </span>
          <a rel="noopener" target="_blank" href="${formattedResponse.info}">giantbomb.com</a>
        </p>
      </div>`;
      container.innerHTML += contents;
      scrapeEmuparadise(formattedResponse.name, formattedResponse.cover);
    } else {
      container.innerHTML = `<h1>No games found.</h1>`;
    }
  }
}

function isValid(str) {
  return !/[~`!#$%^&*+=\-[\]\\;,/{}|\\":<>?]/g.test(str);
}

async function scrapeEmuparadise(gameName) {
  const container = document.getElementsByClassName("game__links")[0];
  if (!isValid(gameName)) {
    container.classList.remove("loading");
    container.innerHTML = "<h4>No game links found.</h4>";
    return;
  }
  const response = await fetch("https://boiling-inlet-32336.herokuapp.com/scrape", {
    method: "POST",
    body: JSON.stringify({ name: gameName }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    return { error: response.statusText };
  } else {
    const data = await response.json();
    if (data !== "nil") {
      container.classList.remove("loading");
      data.forEach((result) => {
        container.innerHTML += `<a rel="noopener" target="_blank"  href="${result.link}">${result.name}</a>`;
      });
    } else {
      container.classList.remove("loading");
      container.innerHTML = "<h4>No game links found.</h4>";
      return;
    }
  }
}
