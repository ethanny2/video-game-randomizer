//Methods to buttons the user pressed and check that information against the information in the database (separate php function)


/*If any of the platforms in this array are in the 'platforms' result run the emuparadise function
instead of the Amazon function*/
var emu_consoles =[ "PlayStation Network (PSP)",				
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
jQuery.support.cors = true;


 $(document).ajaxStart(function() { Pace.restart(); });
  var globalName;



//Platform
var selectedPlats = [] ;
//Genre
var selectedGenres = []; 
//Score
var selectedScores = [];
//time
var selectedTimes = [];
//Date
var selectedYears= [];


function clearData(){
 selectedPlats = [] ;
 selectedGenres = []; 
 selectedScores = [];
 selectedTimes = [];
 selectedYears= [];
}

function gatherButtonValues (){
	//Clear the array.
	clearData();
	console.log('in here!!!');
	var platformButtons =$(".button_column.platform button");
	var genreButtons  =$(".button_column.genre button");
	var scoreButtons= $(".button_column.score button");
	var timeButtons= $(".button_column.time button");
	var yearButtons = $(".button_column.date button");
	$.each(platformButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			//console.log("id: "+ tempId);
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				//console.log( ' currentButton is not hidden and active '  + tempJQ.attr('id'));
				selectedPlats.push(tempId);
			}
				//console.log(selectedPlats);
	});
	$.each(genreButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				//console.log( ' currentButton is not hidden and active '  + tempJQ.attr('id'));
				selectedGenres.push(tempId);
			}
				//console.log(selectedGenres);
	});
	$.each(scoreButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				//console.log( ' currentButton is not hidden and active'  + tempJQ.attr('id'));
				selectedScores.push(tempId);
			}
			//	console.log(selectedScores);

	});
	$.each(timeButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				//console.log( 'currentButton is not hidden and active '  + tempJQ.attr('id'));
				selectedTimes.push(tempId);
			}
		//	console.log(selectedTimes);
	});
	$.each(yearButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				//console.log( 'currentButton is not hidden and active'  + tempJQ.attr('id'));
				selectedYears.push(tempId);
			}
			//console.log(selectedYears);
	});

	//Put the them in an object to send as data through the post
	data = {
		platformArray:selectedPlats , 
		genreArray:selectedGenres ,
		scoreArray:selectedScores,
		timeArray:selectedTimes,
		yearArray:selectedYears
	}

	console.log(data);
	sendSelectedData(data);
}



 

$(document).on('click' , '.run_button' , function(){
	console.log('RUN BUTTON PRESSED');
	gatherButtonValues();
	//activateProgressBar();

});





function sendSelectedData(data){
	var request =  $.ajax({
			/* For web*/
 			//url: '../php/queryDatabase.php',
 			/* For local testing*/
 			url:"http://localhost/Video Game Randomizer Ver 2.0/php/queryDatabase.php",
    	    type: "post",
    	    data:data
			 });
    	request.done(function (response, textStatus, jqXHR){
    	    //console.log("Launching AJAX request for selecting games!");
    	   // console.log(response);
    	    //Get the selected games information 
    	});
	    	request.fail(function (jqXHR, textStatus, errorThrown){
	    	    
	    	    console.error(
	    	        "The following error occurred: "+
	    	        (textStatus, errorThrown));
    	    });
    	     request.success(function (response){
    	     		    	 // console.log("PRINTING THE RESPONSE IN THE SUCCESS FUNCTION!!");
    	     		    	 console.log({ response });
    	     		    	  var formatedResponse = JSON.parse(response);
    	     		    	   /* Moving to the top*/
	    	  				  var platformString="Platforms: ";
	    	  		if(formatedResponse.platforms!=undefined){
	    	  			for(var i = 0;i<formatedResponse.platforms.length;i++){
	    	  				if(i==formatedResponse.platforms.length-1){
	    	  				platformString+= formatedResponse.platforms[i];
	    	  				}else{
	    	  				platformString+= formatedResponse.platforms[i]+",";
	    	  				}
	    	  			}
	    	    	}
					           var escapedCover = formatedResponse.cover;	

					          // var containsEmuPlat = false;    	  
					           // console.log('PLATSTRING IS: '+ platformString);
    	     		     	   globalName = formatedResponse.name;
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

    	     		    	  scrapeEmuparadise(globalName,escapedCover);

	     	  		$(".execution .gamePage").empty();
	     	  		$(".execution .gameTitle").empty();
	     	  		var gamePage =$(".execution .gamePage");
	     	  		
	    	  			

	     	  		var div_title = $('.execution .gameTitle');
	     	  		var div_sum = $('<div class="slideDown"></div>');
	     	  		var sum_icon = $('<i></i>');
	    	  		sum_icon.addClass('fa fa-info-circle fa-2x');
	    	  		sum_icon.css({
	    	  			"padding-right": '1.5%'
	    	  		});
	    	  		div_sum.append(sum_icon);
	     	  		div_sum.addClass('game_sum');	     	  		
	     	  		div_sum.css({
	     	  			"float": 'left',
	     	  			// "border":"2px solid black",
	     	  			"text-align":"left",
	     	  			"padding":".2%",
	     	  		});

	     	  		div_sum.width("100%");
	     	  		div_sum.height("20%");

	    	  		var div_genre = $('<div class="slideDown"></div>');
	    	  		div_genre.addClass('game_genre');
	    	  		var genre_icon = $('<i></i>');
	    	  		genre_icon.addClass('fa fa-info-circle fa-2x');
	    	  		genre_icon.css({
	    	  			"padding-right": '1%'

	    	  		});
	    	  		div_genre.append(genre_icon);


	    	  		div_genre.css({
	     	  			"float": 'left',
	     	  			//"border":"2px solid black",
	     	  			"text-align":"left",
	     	  			"padding":".2%",
	     	  		});
	     	  		div_genre.width("100%");
	     	  		div_genre.height("20%");

	    	  		var div_platform = $('<div class="slideDown"></div>');
	    	  		div_platform.addClass('game_platform');
	    	  		var plat_icon = $('<i></i>');
	    	  		plat_icon.addClass('fa fa-gamepad fa-2x');
	    	  		plat_icon.css({
	    	  			"padding-right": '2%'	
	    	  		});
	    	  		div_platform.append(plat_icon);
	    	  		div_platform.css({
	     	  			"float": 'left',
	     	  			//"border":"2px solid black",
	     	  			"text-align":"left",
	     	  			"padding":".2%",
	     	  		});
	     	  		div_platform.width("100%");
	     	  		div_platform.height("20%");

	     	  		var div_year = $('<div class="slideDown"></div>');
	     	  	    div_year.addClass('game_year');
	     	  	    var year_icon = $('<i></i>');
	    	  		year_icon.addClass('fa fa-calendar-o fa-2x');
	    	  		year_icon.css({
	    	  			"padding-right": '2%'	
	    	  		});
	    	  		div_year.append(year_icon);
	     	  	    
	     	  	    div_year.css({
	     	  			"float": 'left',
	     	  			//"border":"2px solid black",
	     	  			"text-align":"left",
	     	  			"padding":".2%",
	     	  		});
	     	  		div_year.width("100%");
	     	  		div_year.height("20%");

	     	  		var div_rating = $('<div class="slideDown"></div>');
	     	  		div_rating.addClass('game_rating');

	     	  		/*After rating  , this is NOW FOR THE SLIDER TO be created*/
	     	  		var div_suggestion = $('<div></div>');
	     	  		div_suggestion.addClass('game_links');
	     	  		var suggestion_icon = $('<i></i>')
	     	  		suggestion_icon.addClass('fa fa-download fa-2x');

	     	  		var link_icon1 = $('<i></i>');
	     	  		link_icon1.addClass('fa fa-link fa-2x');
	     	  		
	     	  		
	     	  

	     	  		suggestion_icon.css({
	     	  			"padding-right":"2%",
	     	  			
	     	  		});

	     	  


	     	  		div_suggestion.append(suggestion_icon);
	     	  		div_suggestion.css({
	     	  		"float": 'left',
	     	  			//"border":"2px solid black",
	     	  			"text-align":"left",
	     	  			"padding":".2%",
	     	  			"margin-bottom":"5%"
	     	  		});
	     	  		div_suggestion.width("100%");
	     	  		div_suggestion.height("100%");
	     	


	     	  		var rating_icon = $('<i></i>');
	    	  		rating_icon.addClass('fa fa-star fa-2x');
	    	  		rating_icon.css({
	    	  			"padding-right": '2%',

	    	  		});
	    	  		div_rating.append(rating_icon);

	    	  		/* Add animation to make bar fill*/
	     	  	    div_rating.css({
	     	  			"float": 'left',
	     	  			"text-align":"left",
	     	  			"padding":".2%",
	     	  		});
	     	  		div_rating.width("100%");
	     	  		div_rating.height("20%");

	    	  		var div_time = $('<div class="slideDown"></div>');
	    	  		var time_icon = $('<i></i>');
	    	  		time_icon.addClass('fa fa-hourglass-end fa-2x');
	    	  		time_icon.css({
	    	  			"padding-right": '2%'	
	    	  		});
	    	  		div_time.append(time_icon);


	     	  		div_time.addClass('game_time');
	     	  		div_time.css({
	     	  			"float": 'left',
	     	  			"text-align":"left",
	     	  			"padding":".2%"
	     	  		});
	     	  		div_time.width("100%");
	     	  		div_time.height("20%");

	     	 
	     	  	

	     	  		/*Need to helper divs to create a shine effect */
	     	  		img_div = $('<div class="slideDown"></div>');
	     	  		img_div.addClass('gameImage');
	     	  	
	     	  		img_div.css({
	     	  			"width":'50%',
	     	  			"height":'50%',
	     	  			"padding-top":"15px",
	     	  			// "overflow":"hidden",
	     	  			"margin":"auto",
	     	  			"display":"block",
	     	  			"text-align":"center",
	     	  			 "clear":"both"
	     	  				     	
	     	  		});
	     	  	



	    	  		var img_raw = $('<img src='+escapedCover+" />");
	    	  		/*Appending the image */

	     	  		img_div.append(img_raw);
	     	  	




	     	

	    	  		// div_img.css({
	    	  		//  	'content':'url('+formatedResponse.cover+')'
	    	  		//  });
	    	   		// div_img.width("100%");
	     	  		// div_img.height("100%");

	     	  		 // img_raw.width("25%");
	     	  		 // img_raw.height("25%");
	     	  		 img_div.width("100%");
	     	  		 img_div.height("100%");
	    	  		
	    	  		/*Setting the name here!!! */
	    	  		div_title.append(formatedResponse.name);

	    	  		console.log(div_title.text());
	    	  		//console.log(formatedResponse.name);
	    	  		div_sum.append( "Summary: "+formatedResponse.summary);
	    	  		var genreString="Genres: ";
	    	  		if(formatedResponse.genres!=undefined){
	    	  			for(var i = 0;i<formatedResponse.genres.length;i++){
	    	  				if(i==formatedResponse.genres.length-1){
	    	  					genreString+= formatedResponse.genres[i];

	    	  				}else{
	    	  					genreString+= formatedResponse.genres[i]+" , ";
	    	  			    }
	    	  			}
	    	  	    }

	    	    div_time.append('Main story: ' + formatedResponse.main_story+" | " + " Main Story + Extras: " +  
	    	    	formatedResponse.main_extras+" | " + " Combined: " + formatedResponse.combined+" | " + " Completionist: " + formatedResponse.completionist);
	     	  		div_genre.append(genreString);
	     	  		div_platform.append(platformString);
	     	  		div_year.append("Orginal Release Year: " + formatedResponse.releaseDate);
	     	  		div_rating.append("Rating: " +formatedResponse.rating);
	     	  		/*Making it look pretty */
	     	  		var gamePage = $('.execution .gamePage');
	     	  		gamePage.css({
	     	  			"font-size":".80em",
	     	  			"text-align":"center"
	     	  		});

	     	  		if(!formatedResponse.Sorry){
	     	   			  $('.execution .gamePage').append(img_div);
	     	  			  gamePage.append($('<div class="slide-container slideDown "></div>'));
	     	   		   	  $('.execution .gamePage').append(div_sum);
						  $('.execution .gamePage').append(div_genre);
						  $('.execution .gamePage').append(div_year);
						  $('.execution .gamePage').append(div_time);
						  $('.execution .gamePage').append(div_platform);
						  $('.execution .gamePage').append(div_rating);

					
					}else{
						sorry_div = $("<div></div>");
						sorry_div.text(formatedResponse.Sorry);
						sorry_div.css({
							"margin": 'auto 0',
							"font-size": '12vh',
							"top":"50%",
							"margin-top":"15%",
							"background":"white"

						});
						$('.execution .gamePage').append(sorry_div);
					}

    	     });
	   	
} //End of outer AJAX Success call



/* Used to insert image into 3d title dynamically*/
function helperImages(imageLink){
	console.log('Image link is ' + imageLink);
	if(imageLink===''|| imageLink===undefined){
			imageLink="../images/link_icon.png";
			$('.dynamicImage').css('background-image', 'url("'+imageLink+'")');
	}else{
		$('.dynamicImage').css('background-image', 'url("'+imageLink+'")');	
	}
}

/* TBD function to call ajax to php to get link data*/
function scrapeEmuparadise(gameName,imageLink){
	/* This calls create slider later*/
	console.log("Calling scrape emu function with gameName " + gameName);
	$.ajax({
		//Create php file called scrape
		url: 'http://localhost/Video Game Randomizer Ver 2.0/php/scrape.php',
		type: 'POST',
		//dataType: 'json',
		data: {name: gameName},
	})
	.done(function() {
		//console.log("success");
	})
	.fail(function(xhr,textStatus,errorThrown) {
		console.log("Error with the scape function "+ textStatus);
	})	
	.success(function(response) {
		 if(JSON.parse(response)==='nil'){
        	console.log('Invalid URL calling amazon API');
        	sendAmazonData(gameName,imageLink);
        	//displayLinksError();
      	}else{
      		var formatedResponse = JSON.parse(response);
	   		//console.log(formatedResponse[0]['name']);
	   		displayLinks(formatedResponse,imageLink);

      	}
	});
}



function displayLinks(data,imageLink){
	/* When slick is loaded is has a slick-initialized class*/
	container = $('.slide-container');
	if(container.hasClass('slick-initialized')){
		container.slick('unslick');
	}
	container.empty();

	for(var i=0;i<data.length;i++){
		if(data[i]['link']!=="https://www.emuparadise.me-download"){
			// element = $('<a class="slide" target="blank" href="'+data[i]['link']+'"<span>'+data[i]['name']+'</span></a>');
					//<div class = "tdimension"><a href = "#"></a></div>
			 element = $('<div class = "tdimension"><a class="dynamicImage" target="blank" href="'+data[i]['link']+'"><span>'+data[i]['name']+'</span></a></div>');
			container.append(element);
		}
		if(i>=10)break;
	}
	var setting;
	if(data.length==4){
		setting=4;
	}else if(data.length==3){
		setting=3;
	}else if(data.length==2){
		setting=1;
	}else if(data.length==1){
		setting=1;
	}else if(data.length>=4){
		setting=4;
	}

	helperImages(imageLink);

	console.log('Setting is ' + setting);
	 $(".slide-container").slick({
  				  slidesToShow: setting,
 				  slidesToScroll: 1,
  				  dots: true,
  				  focusOnSelect: true,
  				  autoplay: true,
  				  autoplaySpeed: 2000,
  				  accessibility:true,
  				  arrows:false,
  				  pauseOnDotsHover:true,
  				  adaptiveHeight:true,
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


function displayLinksError(){
	container = $('.slide-container');
	if(container.hasClass('slick-initialized')){
		container.slick('unslick');
	}
	container.empty();
	var errorMessage = $("<h3>Sorry no download links found for this game</h3>");
	container.append(errorMessage);
}


/* -------------------------------------------------------------------*/

function displayAmazonLinks(data,imageLink){
	/* When slick is loaded is has a slick-initialized class*/
	container = $('.slide-container');
	if(container.hasClass('slick-initialized')){
		container.slick('unslick');
	}
	container.empty();

	/* Chnage this for amazon*/


	var i=0;
	//item['productUrl'])
	//item['imageUrl']
	// element = $('<div class = "tdimension"><a class="dynamicImage" target="blank" href="'+data[i]['link']+'"><span>'+data[i]['name']+'</span></a></div>');
	for(let item of data){
		var imageClass = 'amazonImage'+i;
		var amazonImage = item['imageUrl'];
		element = $('<div class = "tdimension"><a class="'+imageClass+'" target="blank" href="'+item['productUrl']+'"></a></div>');
	//	console.log('Element contents are ' +'<div class = "tdimension"><a class="'+imageClass+'" target="blank" href="'+item['productUrl']+'"></a></div>'  );
		/* Now for the image class append the image or a picture*/
	//	console.log('Image link is ' + amazonImage);
	//	console.log("TESTING.... "+ '.'+imageClass);
	    container.append(element);
		if(amazonImage===''|| amazonImage===undefined){
			console.log('NO IMAGE AVAILABLE');
			amazonImage="../images/link_icon.png";
			$('.'+imageClass).css('background-image', 'url("'+amazonImage+'")');
		}else{
				console.log('IMAGE AVAILABLE');
			$('.'+imageClass).css('background-image', 'url("'+amazonImage+'")');	
		 }
		 		console.log('Element is '  +element);

			if(i>=10)break;
			i++;
	}
	var setting;
	if(data.length==4){
		setting=4;
	}else if(data.length==3){
		setting=3;
	}else if(data.length==2){
		setting=1;
	}else if(data.length==1){
		setting=1;
	}else if(data.length>=4){
		setting=4;
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
  				  accessibility:true,
  				  arrows:false,
  				  pauseOnDotsHover:true,
  				  adaptiveHeight:true,
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




function sendAmazonData(searchQuery,imageLink){
	//console.log("Starting sendAmazon Data function");
	 data2 = {
		name:searchQuery
		};
	  // console.log("Done with generating all the stuff, starting amazon api POST"); 
	   var request2 =  $.ajax({
 		//	url: '../php/amazon.php',
 			url:'http://localhost/Video Game Randomizer Ver 2.0/php/amazon.php',
    	    type: "POST",
    	    data:data2
			 });
    	request2.done(function (response, textStatus, jqXHR){
    	    console.log("Launching AJAX request for getting amazon links!");
    	  //  console.log(response);
    	});
	    	request2.fail(function (jqXHR, textStatus, errorThrown){
	    	    console.error(
	    	        "The following error occurred: "+
	    	        (textStatus, errorThrown));
    	    });
    	     request2.success(function (response){
    	     	console.log("SUCCESS FOR AMAZON LINK PHP");
  				//displayResults(JSON.parse(response));
  				var good_response = JSON.parse(response);
  				 //		console.log(good_response);  
  				 /*Check if response is empty */
  				 for(let item of good_response){
  				 		if(item['productUrl']==='' || item['productUrl']===undefined){
  				 			displayLinksError();
  				 			break;
  				 		}else{
  				 			  console.log('No data found for both searches');
  				 			  displayAmazonLinks(good_response,imageLink);
  				 			  break;
  				 		}
  				 }
    	     });

}

//-------------------------------------------------------------------------------------------------------------


