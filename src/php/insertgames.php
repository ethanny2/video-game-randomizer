<?php
  // Allow from any origin



  header('Access-Control-Allow-Origin: *');
  //echo "WE MADE IT";
  $servername = "localhost";
  $username = "root";
  $password = "DIAMONDjozu17";
  $dbname = "giant_bomb";
$conn =  new mysqli($servername,$username, $password, $dbname);
if(!$conn){
	die('Could not connect: ' . mysql_error());
}
   print_r($_POST);
   //$genreStatement;
   //$releaseStatement; 
   //$genreQuery ;
   //$releaseQuery ;
   $name = $_POST['name'];
   //$nameEscaped = mysqli_real_escape_string($conn, $name); 
   $id =$_POST['id'];
   // $genre_id =$_POST['id'];
   // $release_info_id =$_POST['id'];
   $cover=$_POST['cover'];
   $summary=$_POST['summary'];
   $releaseDate = $_POST['releaseDate'];
   //$summaryEscaped = mysqli_real_escape_string($conn,$summary); 
  // $time_to_beat=$_POST['howLong'];
   //$rating = $_POST['rating'];
   $url= $_POST['url'];
 //$finalName = mb_convert_encoding($name, "HTML-ENTITIES", "UTF-8");
  //$finalSummary = mb_convert_encoding($summary, "HTML-ENTITIES", "UTF-8");
   $platforms_array = $_POST['platform'];
   $platform_id = $_POST['id'];
   $genre_id = $_POST['id'];
//Include the id of the game in each

  // $rawGenre= $_POST['genre'];
  // $genreLength = count($rawGenre);
//   $genreTablesql = "CREATE TABLE genres( ";
   $genreInsertsql  = [];
   
 //$genreTablesql = $genreTablesql. ")";
 ////echo  $genreTablesql."\n\n" ;





 $platLength = count($platforms_array);
 $platformQueryStatement = [];


    $query = "INSERT INTO giant_bomb_games(name,id,cover,summary,release_data,genre_id,platform_id,url)
    VALUES('$name','$id','$cover','$summary','$releaseDate', '$genre_id' , '$platform_id' ,'$url')";
    echo $query; 
      if(mysqli_query($conn, $query) ===FALSE){
 		   		('could not enter data: ' .mysql_error());
 		   }else{
 		echo "data INSERTED DAWG!!" . "\n";
 	}

 // for ($i = 0; $i < $genreLength; $i++) {
 //     			$genreInsertsql[$i] = " \n INSERT INTO genres (genre_id,genre_name)  VALUES( " .$id. "," .  "'". $rawGenre[$i] . "'"  . ");";
 //     			 echo $genreInsertsql[$i] . "\n"; 
 // 		   if(mysqli_query($conn, $genreInsertsql[$i]) ===FALSE){
 // 		   		('could not enter data: ' .mysql_error());
 // 		   }else{
 // 		echo "data INSERTED DAWG3" . "\n";
 // 	}

//}
 for ($i = 0; $i < $platLength; $i++) {
     		$platformQueryStatement[$i] = " \n INSERT INTO platforms(platform_id, platform_name)  VALUES( " . 
     		$id . "," . "'" .$platforms_array[$i] . "'" .");";
     		echo $platformQueryStatement[$i]  . "\n";
     		     if(mysqli_query($conn, $platformQueryStatement[$i]) ===FALSE){
              echo "Could not enter data";
 		   		('could not enter data: ' .mysql_error());
 		   }else{
 		echo "data INSERTED DAWG2" . "\n";
 	}
}




   $conn->close();
?>
