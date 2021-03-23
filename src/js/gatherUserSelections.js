//Methods to buttons the user pressed and check that information against the information in the database (separate php function)

/*If any of the platforms in this array are in the 'platforms' result run the emuparadise function
instead of the Amazon function*/
var emu_consoles = [
  "PlayStation Network (PSP)",
  "Wii",
  "PlayStation Portable",
  "Nintendo DS",
  "N-Gage",
  "GameCube",
  "Game Boy Advance",
  "WonderSwan Color",
  "PlayStation 2",
  "Nintendo 64DD",
  "Neo Geo Pocket",
  "Neo Geo Pocket Color",
  "WonderSwan",
  "Dreamcast",
  "Game Boy Color",
  "Nintendo 64",
  "Virtual Boy",
  "Sega 32X",
  "PC-FX",
  "PlayStation",
  "Saturn",
  "Neo Geo CD",
  "Bandai Playdia",
  "Amiga CD32",
  "3DO",
  "Sega CD",
  "CD-i",
  "Commodore CDTV",
  "Super Nintendo Entertainment System",
  "Game Gear",
  "Neo Geo",
  "Atari Lynx",
  "Game Boy",
  "TurboGrafx-CD",
  "Genesis",
  "TurboGrafx-16",
  "Acorn Archimedes",
  "Sharp X68000",
  "Apple IIgs",
  "Atari 7800",
  "Sega Master System"
];
// jQuery.support.cors = true;

var globalName;

//Platform
var selectedPlats = [];
//Genre
var selectedGenres = [];
//Score
var selectedScores = [];
//time
var selectedTimes = [];
//Date
var selectedYears = [];

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
  //Clear the array.
  clearData();
  console.log("in here!!!");
  var platformButtons = $(".checkbox-list.platform input");
  var genreButtons = $(".checkbox-list.genre input");
  var scoreButtons = $(".checkbox-list.score input");
  var timeButtons = $(".checkbox-list.time input");
  var yearButtons = $(".checkbox-list.date input");
  $.each(platformButtons, function (_, value) {
    var tempJQ = $(value);
    var tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      //console.log( ' currentButton is not hidden and active '  + tempJQ.attr('id'));
      selectedPlats.push(tempId);
    }
    //console.log(selectedPlats);
  });
  $.each(genreButtons, function (_, value) {
    var tempJQ = $(value);
    var tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      //console.log( ' currentButton is not hidden and active '  + tempJQ.attr('id'));
      selectedGenres.push(tempId);
    }
    //console.log(selectedGenres);
  });
  $.each(scoreButtons, function (_, value) {
    var tempJQ = $(value);
    var tempId = tempJQ.attr("id");
    if (tempId !== "blank") {
      //looks like 10% 19% remove percent signs
      tempId = tempId.replace(/%/g, "");
    }

    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      //console.log( ' currentButton is not hidden and active'  + tempJQ.attr('id'));
      selectedScores.push(tempId);
    }
    //	console.log(selectedScores);
  });
  $.each(timeButtons, function (_, value) {
    var tempJQ = $(value);
    var tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      //console.log( 'currentButton is not hidden and active '  + tempJQ.attr('id'));
      selectedTimes.push(tempId);
    }
    //	console.log(selectedTimes);
  });
  $.each(yearButtons, function (_, value) {
    var tempJQ = $(value);
    var tempId = tempJQ.attr("id");
    if (!tempJQ.is(":hidden") && tempJQ.prop("checked")) {
      //console.log( 'currentButton is not hidden and active'  + tempJQ.attr('id'));
      selectedYears.push(tempId);
    }
    //console.log(selectedYears);
  });

  //Put the them in an object to send as data through the post
  let data = {
    platformArray: selectedPlats,
    genreArray: selectedGenres,
    scoreArray: selectedScores,
    timeArray: selectedTimes,
    yearArray: selectedYears
  };

  console.log(data);
  sendSelectedData(data);
}

$(document).on("click", ".run_button", function () {
  console.log("RUN BUTTON PRESSED");
  gatherButtonValues();
});

async function sendSelectedData(data) {
  console.log({ data });
  let request = await fetch("http://localhost/game-randomizer-portfolio-update/src/php/queryDatabase.php", {
    /* For web*/
    //url: '../php/queryDatabase.php',
    /* For local testing*/
    // url: "http://localhost/Video Game Randomizer Ver 2.0/php/queryDatabase.php",
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!request.ok) {
    console.log(`Error with fetch request ${request.statusText}`);
    return;
  } else {
    const container = document.getElementsByClassName("game")[0];
    container.innerHTML = "";
    var formattedResponse = await request.json();
    console.log({ formattedResponse });
    /* Moving to the top*/
    var platformString = "Platforms: ";
    if (formattedResponse.platforms != undefined) {
      for (let i = 0; i < formattedResponse.platforms.length; i++) {
        if (i == formattedResponse.platforms.length - 1) {
          platformString += formattedResponse.platforms[i];
        } else {
          platformString += formattedResponse.platforms[i] + ",";
        }
      }
    }
    var escapedCover = formattedResponse.cover;

    // var containsEmuPlat = false;
    // console.log('PLATSTRING IS: '+ platformString);
    globalName = formattedResponse.name;
    // 	   for(var i =0;i<emu_consoles.length;i++){
    // 	   	console.log('emu_consoles[i]: '+emu_consoles[i]);
    // 	   		if(platformString.indexOf(emu_consoles[i])!=-1){
    // 	   			var cur = platformString.indexOf(emu_consoles[i]);
    // 	   			var position;
    // 	   			if(platformString.charAt(cur)=='P'){
    // 	   				var check = platformString.substring(cur,cur+20);
    // 	   				console.log('Check is ' + check);
    // 	   				if(check==='PlayStation Portable'){
    // 	   					console.log('Found PSP breaking early');
    // 	   					break;
    // 	   				}
    // 	   				position = cur+10;
    // 	   			}else if(platformString.charAt(cur)=='W'){
    // 	   				position=cur+2;
    // 	   			}

    // 	   			if(platformString.charAt(position+1)!=" " || platformString.length<=position+1){
    // 	   				console.log("Char at next inedx is : "+ platformString.charAt(cur+1));
    // 	   				 containsEmuPlat = true;
    // 	   		    	 console.log('Found amazon console with name '+emu_consoles[i]);
    // 	   				 break;
    // 	   			}
    // 	   		}
    // 	   }
    // 	    console.log('containsEmuPlat is : '+containsEmuPlat);
    // 	   if(containsEmuPlat){
    // 	   		console.log('Calling scrape emu, special platform found');
    // 	   		scrapeEmuparadise(globalName,escapedCover);
    // 	   }else{
    // 	   		 console.log('Calling Amazon API, special platform not found');
    // 	   		 sendAmazonData(globalName,escapedCover);
    // 	   }

    //sendAmazonData(globalName);

    // scrapeEmuparadise(globalName, escapedCover);
    var genreString = "Genres: ";
    if (formattedResponse.genres != undefined) {
      for (let i = 0; i < formattedResponse.genres.length; i++) {
        if (i == formattedResponse.genres.length - 1) {
          genreString += formattedResponse.genres[i];
        } else {
          genreString += formattedResponse.genres[i] + " , ";
        }
      }
    }
    if (!formattedResponse.Sorry) {
      //Success display game on page
      console.log("Game found! displaying...");
      const contents = `<h1 class="game__title">${formattedResponse.name}</h1>
      <h3 class="game__rating"><span class="bold">Rating: </span> ${
        formattedResponse.rating ? formattedResponse.rating : "N/A"
      }</h3>
      <div class="game__content">
        <div class="game__imgcontainer">
          <img src="${formattedResponse.cover}" alt="${formattedResponse.name} box art" />
        </div>
        <p class="release"><span class="bold">Release Date:</span> ${formattedResponse.releaseDate}</p>
        <p>
          <span class="bold"> Summary: </span> ${formattedResponse.summary}
        </p>
        <p><span class="bold"> Time to Complete Main Story: </span> ${formattedResponse.main_story}</p>
        <p><span class="bold"> Time to 100% complete:</span> ${formattedResponse.completionist} </p>
        <p><span class="bold"> Genres:</span>${formattedResponse.platforms.join(", ")}</p>
        <p><span class="bold"> Platforms: </span> ${formattedResponse.genres.join(", ")}</p>
        <p class="info">
          <span class="bold">Additional Info: </span>
          <a href="${formattedResponse.info}">giantbomb.com</a>
        </p>
      </div>`;
      container.innerHTML += contents;
    } else {
      let sorry_div = $("<div></div>");
      sorry_div.text(formattedResponse.Sorry);
      sorry_div.css({
        margin: "auto 0",
        "font-size": "12vh",
        top: "50%",
        "margin-top": "15%",
        background: "white"
      });
      $(".execution .gamePage").append(sorry_div);
    }
  } //End of else for successfull response
}
/* Used to insert image into 3d title dynamically*/
function helperImages(imageLink) {
  console.log("Image link is " + imageLink);
  if (imageLink === "" || imageLink === undefined) {
    imageLink = "../images/link_icon.png";
    $(".dynamicImage").css("background-image", 'url("' + imageLink + '")');
  } else {
    $(".dynamicImage").css("background-image", 'url("' + imageLink + '")');
  }
}

/* TBD function to call ajax to php to get link data*/
function scrapeEmuparadise(gameName, imageLink) {
  /* This calls create slider later*/
  console.log("Calling scrape emu function with gameName " + gameName);
  $.ajax({
    //Create php file called scrape
    url: "http://localhost/Video Game Randomizer Ver 2.0/php/scrape.php",
    type: "POST",
    //dataType: 'json',
    data: { name: gameName }
  })
    .done(function () {
      //console.log("success");
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log("Error with the scape function " + textStatus);
    })
    .success(function (response) {
      if (JSON.parse(response) === "nil") {
        console.log("Invalid URL calling amazon API");
        sendAmazonData(gameName, imageLink);
        //displayLinksError();
      } else {
        var formattedResponse = JSON.parse(response);
        //console.log(formattedResponse[0]['name']);
        displayLinks(formattedResponse, imageLink);
      }
    });
}

function displayLinks(data, imageLink) {
  /* When slick is loaded is has a slick-initialized class*/
  let container = $("#results");
  container.empty();
  for (let i = 0; i < data.length; i++) {
    if (data[i]["link"] !== "https://www.emuparadise.me-download") {
      // element = $('<a class="slide" target="blank" href="'+data[i]['link']+'"<span>'+data[i]['name']+'</span></a>');
      //<div class = "tdimension"><a href = "#"></a></div>
      let element = $(
        '<div class = "tdimension"><a class="dynamicImage" target="blank" href="' +
          data[i]["link"] +
          '"><span>' +
          data[i]["name"] +
          "</span></a></div>"
      );
      container.append(element);
    }
    if (i >= 10) break;
  }
  var setting;
  if (data.length == 4) {
    setting = 4;
  } else if (data.length == 3) {
    setting = 3;
  } else if (data.length == 2) {
    setting = 1;
  } else if (data.length == 1) {
    setting = 1;
  } else if (data.length >= 4) {
    setting = 4;
  }

  helperImages(imageLink);

  console.log("Setting is " + setting);
  $(".slide-container").slick({
    slidesToShow: setting,
    slidesToScroll: 1,
    dots: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    accessibility: true,
    arrows: false,
    pauseOnDotsHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

function displayLinksError() {
  let container = $("#results");
  container.empty();
  var errorMessage = $("<h3>Sorry no download links found for this game</h3>");
  container.append(errorMessage);
}

/* -------------------------------------------------------------------*/

function displayAmazonLinks(data, imageLink) {
  /* When slick is loaded is has a slick-initialized class*/
  let container = $("#results");
  container.empty();

  /* Chnage this for amazon*/

  let i = 0;
  //item['productUrl'])
  //item['imageUrl']
  // element = $('<div class = "tdimension"><a class="dynamicImage" target="blank" href="'+data[i]['link']+'"><span>'+data[i]['name']+'</span></a></div>');
  for (let item of data) {
    var imageClass = "amazonImage" + i;
    var amazonImage = item["imageUrl"];
    let element = $(
      '<div class = "tdimension"><a class="' +
        imageClass +
        '" target="blank" href="' +
        item["productUrl"] +
        '"></a></div>'
    );
    //	console.log('Element contents are ' +'<div class = "tdimension"><a class="'+imageClass+'" target="blank" href="'+item['productUrl']+'"></a></div>'  );
    /* Now for the image class append the image or a picture*/
    //	console.log('Image link is ' + amazonImage);
    //	console.log("TESTING.... "+ '.'+imageClass);
    container.append(element);
    if (amazonImage === "" || amazonImage === undefined) {
      console.log("NO IMAGE AVAILABLE");
      amazonImage = "../images/link_icon.png";
      $("." + imageClass).css("background-image", 'url("' + amazonImage + '")');
    } else {
      console.log("IMAGE AVAILABLE");
      $("." + imageClass).css("background-image", 'url("' + amazonImage + '")');
    }
    console.log("Element is " + element);

    if (i >= 10) break;
    i++;
  }
  var setting;
  if (data.length == 4) {
    setting = 4;
  } else if (data.length == 3) {
    setting = 3;
  } else if (data.length == 2) {
    setting = 1;
  } else if (data.length == 1) {
    setting = 1;
  } else if (data.length >= 4) {
    setting = 4;
  }

  // helperImages(imageLink);

  //console.log('Setting is ' + setting);
  $(".slide-container").slick({
    slidesToShow: setting,
    slidesToScroll: 1,
    dots: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    accessibility: true,
    arrows: false,
    pauseOnDotsHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}
/* -------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------
/* Used for getting the and displaying from the Amazon POST function, no longer needed. Or to be replaced. */

// function displayResults(responseObject){
// 	console.log(responseObject);
// 	/* For the different heights of the item divs.*/
// 	height_vals =[];
// 	div_suggestion= $('.game_links');
// 	for(let item of responseObject){
// 		if(item['productUrl']!=""){

// 			store_link = $('<a></a>');
// 			store_link.text("Store link");
// 			store_link.attr('href', item['productUrl']);
// 			store_link.attr('target', '_blank');
// 			store_link.addClass('main_link');
// 			item_div = $('<div></div>');
// 			item_div.addClass('itemDiv')
// 			if(item['imageUrl']!=""){
// 				var img_raw = $('<img src='+item['imageUrl']+" />");
// 				img_raw.width("60%");
// 				img_raw.height("100px");
// 				item_div.append(img_raw);
// 			}else{
// 				var img_raw = $('<i></i>');
// 				img_raw.addClass('fa fa-file-image-o fa-2x');
// 				img_raw.width("60%");
// 				img_raw.height("108px");
// 				item_div.append(img_raw);
// 			}
// 			item_div.append(store_link);
// 			div_suggestion.append(item_div);
// 			//NOT
// 			//console.log(item_div.css('height'));
// 		}
// 	}
// 	//NOT
// 	// $('.game_links .itemDiv').each(function(index, el) {
// 	// 		console.log(el.height());
// 	// });
// }

function sendAmazonData(searchQuery, imageLink) {
  //console.log("Starting sendAmazon Data function");
  let data2 = {
    name: searchQuery
  };
  // console.log("Done with generating all the stuff, starting amazon api POST");
  var request2 = $.ajax({
    //	url: '../php/amazon.php',
    url: "http://localhost/Video Game Randomizer Ver 2.0/php/amazon.php",
    type: "POST",
    data: data2
  });
  request2.done(function (response, textStatus, jqXHR) {
    console.log("Launching AJAX request for getting amazon links!");
    //  console.log(response);
  });
  request2.fail(function (jqXHR, textStatus, errorThrown) {
    console.error("The following error occurred: " + (textStatus, errorThrown));
  });
  request2.success(function (response) {
    console.log("SUCCESS FOR AMAZON LINK PHP");
    //displayResults(JSON.parse(response));
    var good_response = JSON.parse(response);
    //		console.log(good_response);
    /*Check if response is empty */
    for (let item of good_response) {
      if (item["productUrl"] === "" || item["productUrl"] === undefined) {
        displayLinksError();
        break;
      } else {
        console.log("No data found for both searches");
        displayAmazonLinks(good_response, imageLink);
        break;
      }
    }
  });
}

//-------------------------------------------------------------------------------------------------------------
