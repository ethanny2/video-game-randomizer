<?php
   header('Access-Control-Allow-Origin: *');
  $servername = "localhost";
  /* For online hosting
  $username = "ethanny2_root";
  $password = "DIAMONDjozu17";
  $dbname  = "ethanny2_game_database";
  */
  /*For local testing */
  $username = "root";
  $password = "";
  $dbname  = "ethanny2_game_database";
  $port = "3307";

$conn = new mysqli($servername, $username, $password, $dbname, $port);
$randomGameRows = "SELECT cover FROM giant_bomb_games WHERE `cover` IS NOT NULL ORDER BY RAND() LIMIT 50";
$result = $conn->query($randomGameRows);
$imageArray= [];
if($result->num_rows > 0){
         while($row = $result->fetch_assoc()){
         	array_push($imageArray, $row["cover"]);
         }
        // echo var_dump($imageArray);
        echo json_encode($imageArray);
}else{
	//echo "There where no results for the random Query!";
}





$conn->close();


  ?>