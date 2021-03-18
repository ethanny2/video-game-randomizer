//Effect to make random game images float across the splash page.
var array; 

$(document).ajaxStart(function() { Pace.restart(); });

jQuery.support.cors = true

 $(document).ready(function(){
  console.log('What the hell IE');
 	  generateImages();
 }); 







function generateImages(){

	var imageArray ;
	var request =  $.ajax({
    /* Needed for online hosting*/
 	//	url: '../php/queryForImages.php',
      /* For local testing*/
      url:"http://localhost/Video Game Randomizer Ver 2.0/php/queryForImages.php",
   	    type: "post",
   	    //data needed?
		 });
   	request.done(function (response, textStatus, jqXHR){
   	    // Log a message to the console
   	    console.log("Hooray, it worked!");
   	   // console.log(response);
   	});

   	request.success(function(response){
			console.log({ response });
   		console.log("POST call for splash screen successful");
   		 var data = jQuery.parseJSON(response);
   		// console.log(data);
   		 //GOT IT
   		 console.log("Returned data!!!");
   		 appendImages(data);
   		

   	});
    	request.fail(function (jqXHR, textStatus, errorThrown){
    	    // Log the error to the console
    	    console.error(
    	        "The following error occurred: "+
    	        (textStatus, errorThrown));
   	    });
   
}


function appendImages(links){
//Add 10 images to each row.
	$.each(links, function(index,value){
		//console.log('In the each function');
		var div = $('<div><img src='+ value +' /></div>');
		//var img = $('<img src=' + value+'></img>');
		div.addClass('grid-item');
		//div.append(img);
		//console.log(div);
		$(".first_page .grid").append(div);
	});	
//Set up the masonry and the image loaded script
	var $grid = $('.grid').masonry({
  		itemSelector: '.grid-item',
  		columnWidth: '.grid-sizer',
  		percentPosition: true
	});
		$grid.imagesLoaded().progress( function() {
  		$grid.masonry();
	}); 

}