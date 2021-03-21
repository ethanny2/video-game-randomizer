import "../sass/styling.scss";
import Packery from "packery";
let grid;

const data = [
  {
    name: "Silas",
    id: "29881",
    cover: "http://www.giantbomb.com/api/image/scale_medium/1255295-w16.jpg",
    summary: "Silas is a kart racing shooter from Exalt Studios",
    release_data: "2010-05-20",
    rating: null,
    url: "http://www.giantbomb.com/silas/3030-29881/",
    platforms: "PC",
    genres: "Driving/Racing|Vehicular Combat",
    main_story: "--",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "John Madden Football '92",
    id: "17667",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2370662-genesis_johnmaddenfootball92.jpg",
    summary:
      "John Madden Football '92 is one of the first games in the Madden series and introduced many new features that are still in Madden games today.",
    release_data: "1991-09-23",
    rating: null,
    url: "http://www.giantbomb.com/john-madden-football-92/3030-17667/",
    platforms: "Genesis",
    genres: "Sports|Simulation|Football",
    main_story: "--",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "Tacoma",
    id: "48325",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2706657-screen%20shot%202014-12-05%20at%209.35.24%20pm.png",
    summary:
      "The next game from Fullbright, the creators of Gone Home. What mysteries await, 200,000 miles from Earth?",
    release_data: "2017-06",
    rating: null,
    url: "http://www.giantbomb.com/tacoma/3030-48325/",
    platforms: "Mac|PC|Xbox One|Linux",
    genres: "",
    main_story: "--",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "Shattered Galaxy",
    id: "18965",
    cover: "http://www.giantbomb.com/api/image/scale_medium/235560-1171227289.jpg",
    summary: "An MMORTSRPG with explosions, depth and a still solid community.",
    release_data: "2001-08-31",
    rating: null,
    url: "http://www.giantbomb.com/shattered-galaxy/3030-18965/",
    platforms: "PC",
    genres: "Action|Strategy|Role-Playing|Real-Time Strategy|MMORPG",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Atomic Punk",
    id: "40374",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2359930-12425401.jpg",
    summary: "Arcade version of Bomberman/Atomic Punk/Dynablaster",
    release_data: "1991-12-31",
    rating: null,
    url: "http://www.giantbomb.com/atomic-punk/3030-40374/",
    platforms: "Arcade",
    genres: "Action|Puzzle",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Green Game: TimeSwapper",
    id: "53275",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2839423-9711370264-heade.jpg",
    summary: "iFun4All's mechanical bird returns for another action puzzle game, this time with time manipulation.",
    release_data: "2016-04-04",
    rating: null,
    url: "http://www.giantbomb.com/green-game-timeswapper/3030-53275/",
    platforms: "PC|iPhone|PlayStation Network (Vita)",
    genres: "Action|Puzzle",
    main_story: "--",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "Zombie Solitaire",
    id: "48533",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2715402-0396012121-heade.jpg",
    summary: "A solitaire game with zombie cards and mini-games.",
    release_data: "",
    rating: null,
    url: "http://www.giantbomb.com/zombie-solitaire/3030-48533/",
    platforms: "PC",
    genres: "Card Game",
    main_story: "6½ Hours",
    main_extras: "--",
    completionist: "6½ Hours",
    combined: "6½ Hours"
  },
  {
    name: "Centaur",
    id: "45196",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2593272-cent1.jpg",
    summary: "Centaur pinball machine from Bally.",
    release_data: "",
    rating: null,
    url: "http://www.giantbomb.com/centaur/3030-45196/",
    platforms: "",
    genres: "",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Cyber Troopers Virtual-On: Oratorio Tangram",
    id: "4819",
    cover:
      "http://www.giantbomb.com/api/image/scale_medium/899899-cyber_troopers_virtual_on_oratorio_tangram_coverart.png",
    summary: "A fighting game featuring giant robots and full 3D movement.",
    release_data: "2000-06-01",
    rating: null,
    url: "http://www.giantbomb.com/cyber-troopers-virtual-on-oratorio-tangram/3030-4819/",
    platforms: "Dreamcast|Arcade|Xbox 360 Games Store",
    genres: "Action|Fighting|Vehicular Combat",
    main_story: "5½ Hours",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "The Midnight Station",
    id: "48140",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2697040-1460498924-Midni.png",
    summary:
      "The Midnight Station is a surreal action-adventure RPG. Your goal is to escape the station and discover its many secrets along the way.",
    release_data: "2014-10-09",
    rating: null,
    url: "http://www.giantbomb.com/the-midnight-station/3030-48140/",
    platforms: "PC",
    genres: "Role-Playing|Action-Adventure",
    main_story: "--",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "NHL 13",
    id: "37807",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2276035-box_nhl13.png",
    summary: "NHL 13 is the 21st installment in the NHL franchise by EA SPORTS.",
    release_data: "2012-09-11",
    rating: "84",
    url: "http://www.giantbomb.com/nhl-13/3030-37807/",
    platforms: "Xbox 360|PlayStation 3|Xbox 360 Games Store|PlayStation Network (PS3)",
    genres: "Sports|Simulation|Hockey",
    main_story: "--",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "Pinky Street: Kira Kira Rainbow Pack",
    id: "23990",
    cover: "http://www.giantbomb.com/api/image/scale_medium/710319-front.jpg",
    summary: "A compilation of both Pinky Street games.",
    release_data: "2007-12-18",
    rating: null,
    url: "http://www.giantbomb.com/pinky-street-kira-kira-rainbow-pack/3030-23990/",
    platforms: "Nintendo DS",
    genres: "Simulation|Compilation|Music/Rhythm",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Golden Gloves",
    id: "29734",
    cover: "http://www.giantbomb.com/api/image/scale_medium/1242925-1.jpg",
    summary: "A pinball machine made in 1949 by Chicago Coin.",
    release_data: "1949-07-01",
    rating: null,
    url: "http://www.giantbomb.com/golden-gloves/3030-29734/",
    platforms: "Pinball",
    genres: "Boxing|Pinball",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Bullet Witch",
    id: "10037",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2133339-box_bwitch.png",
    summary:
      "Bullet Witch is an action-adventure third-person shooter, which follows a young witch as she tries to save humanity from a demon army.",
    release_data: "2007-02-27",
    rating: null,
    url: "http://www.giantbomb.com/bullet-witch/3030-10037/",
    platforms: "Xbox 360|Xbox 360 Games Store",
    genres: "Action-Adventure",
    main_story: "6½ Hours",
    main_extras: "--",
    completionist: "--",
    combined: "--"
  },
  {
    name: "Seek 'n Spell",
    id: "27029",
    cover: "http://www.giantbomb.com/api/image/scale_medium/1784443-seeknspell_globe_title.jpg",
    summary: "Seek 'n Spell is a virtual reality game developed for Iphone and Android phones by Retronyms.",
    release_data: "2009-06-12",
    rating: null,
    url: "http://www.giantbomb.com/seek-n-spell/3030-27029/",
    platforms: "iPhone|Android",
    genres: "Trivia/Board Game|Puzzle",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Power Drive 2000",
    id: "49774",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2752372-power%20drive%202000.jpg",
    summary: "A stylized 80's Sci-Fi themed arcade style racing game.",
    release_data: "",
    rating: null,
    url: "http://www.giantbomb.com/power-drive-2000/3030-49774/",
    platforms: "",
    genres: "Driving/Racing",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "F1 2001",
    id: "16378",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2333746-box_f12001.png",
    summary: "A formula 1 racing game.",
    release_data: "2001-11-18",
    rating: "83",
    url: "http://www.giantbomb.com/f1-2001/3030-16378/",
    platforms: "PlayStation 2|Xbox|PC",
    genres: "Driving/Racing|Simulation",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Bakushou!! Jinsei Gekijou 2",
    id: "11080",
    cover: "http://www.giantbomb.com/api/image/scale_medium/535272-bakushou_2_box.jpg",
    summary: "A Japanese life-simulation game released for the NES in 1991.",
    release_data: "1991-05-22",
    rating: null,
    url: "http://www.giantbomb.com/bakushou-jinsei-gekijou-2/3030-11080/",
    platforms: "Nintendo Entertainment System",
    genres: "Simulation|Trivia/Board Game",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Speedboat Assassins",
    id: "2273",
    cover: "",
    summary: "",
    release_data: "",
    rating: null,
    url: "http://www.giantbomb.com/speedboat-assassins/3030-2273/",
    platforms: "Amiga|Amstrad CPC|ZX Spectrum",
    genres: "Action|Driving/Racing",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  },
  {
    name: "Bubble Guppies",
    id: "38603",
    cover: "http://www.giantbomb.com/api/image/scale_medium/2411429-bubbleguppies.jpg",
    summary: "Bubble Guppies is a DS game based on the pre-school TV show of the same name.",
    release_data: "2012-11-06",
    rating: null,
    url: "http://www.giantbomb.com/bubble-guppies/3030-38603/",
    platforms: "Nintendo DS",
    genres: "Adventure",
    main_story: "",
    main_extras: "",
    completionist: "",
    combined: ""
  }
];
window.addEventListener("DOMContentLoaded", () => {
  // generateImages();
  appendImages(data);
  let loader = document.getElementById("lds-default");
  const offset = 10;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - offset) {
      console.log("Loading more infinite images");
      loader.style.display = "initial";
      generateImages();
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
      console.log(document.getElementsByClassName("gameUrl")[0]);
      document.getElementsByClassName("gameUrl")[0].focus();
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
      const gridItem = $(`<div tabindex="0"></div>`);
      const image = $("<img src=" + value.cover + " />");
      gridItem.addClass("grid-item");
      gridItem.append(image);
      gridItem.on("click", (e) => {
        const isModalDisplayed = $(".modal").hasClass("fade-in");
        // if modal is not displayed; show modal prevent bubble
        if (!isModalDisplayed) {
          $(".modal").addClass("fade-in");
          $("section").addClass("unfocus");
          $(modal).html(`
        <h1 class="cutoff cutoff--sm">${value.name}</h1>
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
