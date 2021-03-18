var id_array;
var genre_object_array  = [];

function genreAjaxCall(){
	console.log("IN THE AJAX CALL WITH THE REQUEST DATA");
	$.ajax({
		/*Not used on site, just for inital pull */
		url:'http://localhost/gameApp/php/all_id_pull.php',
		type: "post",
		sucess:function(data){

		},
		 error:function(data){
		 	console.log('An Error occured!!');
		 	console.log(data);	
		 }
	}).done(function (data) {
	  var parsed_data = jQuery.parseJSON(data);
	  console.log('AJAX Call is done!');
	  console.log(parsed_data);
   	  console.log("Returned data!!!");
   	  id_array=parsed_data;
   	  getGenreData(createRequestData2());
  });
}

function getGenreData(requestData){
	console.log("Calling get genre Data");
	console.log(requestData.url_1 + id_array[0]+"/"+requestData.url_2);
	$.ajax({
		url:requestData.url_1 + id_array[0]+"/"+requestData.url_2,
		type:'GET',
		dataType:'jsonp',
		format:'jsonp',
        crossDomain:true,
        json_callback: 'cacheGenre',
		 data:{
       		json_callback: 'cacheGenre'
		  },
		sucess:function(data){
			console.log('It worked!' );
			console.log(data.source);
			//cacheData(data);
		},
		  // error:function(data){
		  // 	console.log('An Error occured!!');
		  // 	console.log(data);
		  // },
	}).done(function (data) {
		console.log('AJAX Call is in done function!!!!!!!!!');
  });
}

function cacheGenre(data){
	var genreNames = [];
	var genre_object = {};
	console.log("CALLING JSON CALLBACK cacheGenre");
	console.log(data.results);
	$.each(data.results.genres,function(index, value) {
		var name = value.name;
	 			for(var i=0;i<name.length;i++){
	 				if(name[i]==='\''){
	 					console.log('Found apostrophe at index genre Name' + i );
	 					name  = insertAt(name, i , '\'');
	 					i++;
	 				}
	 			}
		genreNames.push(name);
		var id = id_array[0];
		console.log("Name: " + name + " id: " + id);
	});
	genre_object["genres"] = genreNames;
	genre_object['id']=id_array[0];
	//Pop off one id and call again 
	if(id_array.length>1){
		// id_array.splice(0, 1);
		// console.log(id_array);
		// insertData(genre_object);
		// getGenreData(createRequestData2());
		setTimeout(function() { 
		console.log("Inside the setTimeout function ");
		id_array.splice(0, 1);
		 console.log(id_array);
		 insertData(genre_object);
		 getGenreData(createRequestData2());

		}, 2000);



	}else{
		//all done make a post call to put it in the database.
			//console.log("PRINTING GENRE OBJECT" + genre_object);
	}
}


 $(document).ready(function(){
 	//console.log("CALLING GENRE PULL!")
 	//genreAjaxCall();
 }); 

function insertData(data){
	console.log("Inside insert data damn");
	console.log(genre_object_array);
	var request =  $.ajax({
 			url: 'http://localhost/gameApp/php/insert_genres.php',
    	    type: "post",
    	    data
		});
    	// Callback handler that will be called on success
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

function createRequestData2(){
var requestData = {
			url_1:"http://www.giantbomb.com/api/game/",
			url_2:"?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=jsonp&field_list=genres",
    		type:"GET",
    		dataType:'jsonp',
    		data:{
            json_callback: 'cacheData',
		}
	}
return requestData;
}




