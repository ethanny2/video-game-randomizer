
// var igdbOffset = 0;

// igdbPlatformCodes = {};
// igbdGenreCodes= {};
// 	for (var i = 0; i < localStorage.length; i++){
// 		if(localStorage.key(i).includes("plat")){
// 			var unCodedId = localStorage.key(i);
// 			var realId = (unCodedId.substr(unCodedId.indexOf(" "), unCodedId.length)).trim();
// 			 igdbPlatformCodes[realId] =(localStorage.getItem(localStorage.key(i))); 
// 			 //console.log("Console name is "  +localStorage.getItem(localStorage.key(i)) + " id: " + realId); 
// 		}else if(localStorage.key(i).includes("genre")){
// 			var unCodedId = localStorage.key(i);
// 		  	var realId = (unCodedId.substr(unCodedId.indexOf(" "), unCodedId.length)).trim();
// 			igbdGenreCodes[realId] =localStorage.getItem(localStorage.key(i)); 
// 			//console.log("Genre name is "  +localStorage.getItem(localStorage.key(i)) + " id: " + realId );
// 		}
// }

	
// //console.log(igdbPlatformCodes);
// console.log(igbdGenreCodes);
	





//Limit is 50 at at time, for now test 1 
//Need to keep track  of the offset number
var offSetNumber= 0;





function ajaxCall(requestData){
	console.log("IN THE AJAX CALL WITH THE REQUEST DATA");
	console.log(requestData.url);
	$.ajax({
		url:requestData.url,
		type:'GET',
		dataType:'jsonp',
		format:'jsonp',
        crossDomain:true,
        json_callback: 'cacheData',
		data:{
		 	 offset: igdbOffset,
       		 json_callback: 'cacheData',
		 },
		sucess:function(data){
			console.log('It worked!' );
			console.log(data.source);
			//cacheData(data);
		},
		// error:function(data){
		// 	console.log('An Error occured!!');
		// 	console.log(data);
		// }
	}).done(function (data) {
	console.log('AJAX Call is done!');
  });
}

 $(document).ready(function(){
 	console.log("CALLING THE AJAX CALL FOR GIANT BOMB");
	//ajaxCall(createRequestData());
 }); 


function incrementOffset(){
	igdbOffset+=100;
}

function createRequestData(){
	console.log("IN CREATE REQUEST DATA");
	//WHY IN THE FUCKFUCKFUCK FUCK DOES THIS FUNCTION FUCKING WORK IT DOESNT EVEN 
	var requestData = {
			url:"http://www.giantbomb.com/api/games/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=jsonp&field_list=name,platforms,original_release_date,site_detail_url,image,deck,id,expected_release_year,expected_release_month",
    		type:"GET",
    		dataType:'jsonp',
    		data:{
  		    offset: igdbOffset,
            json_callback: 'cacheData',
            field_list:'name, platforms, image,deck, original_release_date,id,site_detail_url'
		}
	};
	console.log(requestData['url']);
	return requestData;
}






//Function to convert unix time to javascript human dates. STACK
/*
Just convert from nanoseconds to miliseconds and use the functions.
*/
function dateConverter(UNIX_timestamp){
  console.log("NANO SECONDS IS " + UNIX_timestamp);
  console.log("Miliseconds is "+  Math.floor(UNIX_timestamp));
  var a = new Date(Math.floor(UNIX_timestamp));
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  console.log('converted year is' + a.getFullYear());
  var month = a.getMonth();
  var date = a.getDate();
  var time = year+ '-'+ date + "-"+ month ;
  return time;
}

//Seconds on game, review implementation
function timeConverter(UNIX_timestamp){
UNIX_timestamp = Number(UNIX_timestamp);
var h = Math.floor(UNIX_timestamp / 3600);
var m = Math.floor(UNIX_timestamp % 3600 / 60);
var s = Math.floor(UNIX_timestamp % 3600 % 60);
var rounded = Math.round(m);
if(rounded >=31){
	//Put another hour
	h++; 
}
//return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
return h;
}

//name, platforms, image,deck, original_release_date,id,site_detail_url
function cacheData(result){
	gameEntryArray = [];
	console.log('cacheData function called');
	console.log(result.results);
	//This doesn't work when pulling just one game
	$.each(result.results, function(index,value){
		console.log(value);
	 	var name = value.name;
		console.log('name is ' +value.name); 
		var mainId = value.id;
		console.log('id is ' +value.id);
		var gameUrl  = value.site_detail_url;
		console.log('url is ' + gameUrl );
	 	var summary =  value.deck;
	 	console.log('summary is ' + summary); 
	 	var imageUrl;
	 	if(value.image!==undefined && value.image!==null){
	 		console.log("Inside the value image!");
	 	imageUrl =  value.image['medium_url']; 
	 	console.log('image url is '  + imageUrl);
		}else{
	 		imageUrl=null;
		}
		 	console.log("Image id is " + imageUrl);
	 	//This is one value, just the original release 
	 	//okay some games have not been released yet.
	 	//If releaseDate is null then put expected release year, and then check for month
	 	console.log("Expected release year " + value.expected_release_year);
	 	console.log("Expected released month " + value.expected_release_month);
	 	var releaseData="";
	 	if(value.original_release_date!==null){
	 	 releaseData = value.original_release_date;
	 	 releaseData = releaseData.substr(0,releaseData.indexOf(" "));
	 	}else if(value.expected_release_year!==null){
	 		//got the year 
	 		console.log("INSIDE EXPECTED YEAR");
	 		 releaseData =value.expected_release_year;
	 		//Check for the month
	 		if(value.expected_release_month!==null){
	 			console.log("Month is how long: "  + value.expected_release_month.toString().length);
	 			var monthLength = value.expected_release_month.toString().length;
	 			if(monthLength==1){
	 			releaseData+="-0"+value.expected_release_month;
	 		    }else{
	 			releaseData+="-"+value.expected_release_month;
	 			}
	 		}
	 	}else{
	 		var releaseData = null;
	 	}
	 	//Split along space 
	 	console.log("Original release data is " + releaseData);
	 	allPlatformsNames=[];
	 	$.each(value.platforms, function(index,value){
	 		 var platName = value.name
	 		 console.log(platName);
	 		allPlatformsNames.push(platName);
	 	});
	// 	//SQL needs to had apstromphes double escaped
	 		for(var i=0;i<name.length;i++){
	 			if(name[i]==='\''){
	 				name = insertAt(name, i , '\'');
	 				console.log('Found apostrophe at index ' + i );
	 				i++;
	 			}
	 		}
		console.log('New name is ' + name);
	 		if(summary!==undefined && summary!=null){
	 			for(var i=0;i<summary.length;i++){
	 				if(summary[i]==='\''){
	 					console.log('Found apostrophe at index DECK' + i );
	 					summary  = insertAt(summary, i , '\'');
	 					i++;
	 				}
	 			}
	 	}
	 	console.log('New Summary is '  + summary); 		
	 	var gameEntry = {
	 		name:name,
	 		id:mainId,
	 		genre_id:mainId,
	 		platform_id:mainId,
	 		cover:imageUrl,
	 		summary:summary,
	 		platform:allPlatformsNames,
	 		releaseDate: releaseData,
	 		url:gameUrl
	 	};
		insertGamesintoDataBase(gameEntry);
	});
	if(igdbOffset<=57000){
		incrementOffset();
		console.log("Offset is now " + igdbOffset);
		ajaxCall(createRequestData());
	}
}


function insertGamesintoDataBase(data){
 	var request = 	$.ajax({
 			url: 'http://localhost/gameApp/php/insertgames.php',
    	    type: "post",
    	    data});
	//Callback handler that will be called on success
    	request.done(function (response, textStatus, jqXHR){
    	    // Log a message to the console
    	    console.log("Hooray, it worked!");
    	    console.log(response);
    	});
	    	// Callback handler that will be called on failure
	    	request.fail(function (jqXHR, textStatus, errorThrown){
	    	    // Log the error to the console
	    	    console.error(
	    	        "The following error occurred: "+
	    	        (textStatus, errorThrown));
    	    });
	}