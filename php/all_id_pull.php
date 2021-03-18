<?php
header('Access-Control-Allow-Origin: *');

//echo "The POST WORKED!";
$servername = "localhost";
$username = "root";
$password = "DIAMONDjozu17";
$dbname  = "giant_bomb";
$conn = new mysqli($servername, $username, $password, $dbname);
$all_id = "SELECT id FROM giant_bomb_games WHERE id >=36728";
$result = $conn->query($all_id);
$idArray= [];
if($result->num_rows > 0){
         while($row = $result->fetch_assoc()){
         	array_push($idArray, $row["id"]);
         }
        // echo var_dump($imageArray);
        echo json_encode($idArray);
}else{
	//echo "There where no results for the random Query!";
}





$conn->close();


  ?>