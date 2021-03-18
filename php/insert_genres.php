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
//echo $_POST;
$genreQueryStatement ;
$genre_array= $_POST['genres'];
$id = $_POST['id'];

for($i=0;$i<count($genre_array);$i++){
	$genreQueryStatement =  "INSERT INTO genres(genre_id, genre_name)  VALUES( " . $id. "," . "'" .  $genre_array[$i]  . "')" ;
	echo $genreQueryStatement . "\n";
	   if(mysqli_query($conn, $genreQueryStatement) ===FALSE){
              echo "Could not enter data";
 		   		('could not enter data: ' .mysql_error());
 		   }else{
 		echo "data INSERTED DAWG2" . "\n";
 	}
}



 ?>