<?php
  require_once realpath($_SERVER["DOCUMENT_ROOT"])."/res/secure/database.php";
  require_once realpath($_SERVER["DOCUMENT_ROOT"])."/res/lib.php";

  $returnObj = [];

  $conn = connectDB("newOmegaball");
  $query = "SELECT playerName FROM PlayerName WHERE position= -1 OR position= 1 ORDER BY RAND() LIMIT 5";
  $result = runQuery($conn, $query);
  $firstName = [];
  $lastName = [];
  while ($row = $result->fetch_assoc()){
    $firstName[] = $row["playerName"];
  }
  $query = "SELECT playerName FROM PlayerName WHERE position= -1 OR position= 3 ORDER BY RAND() LIMIT 5";
  $result = runQuery($conn, $query);
  while ($row = $result->fetch_assoc()){
    $lastName[] = $row["playerName"];
  }
  for($x=0; $x<sizeof($firstName); $x++){
    $returnObj[] = $firstName[$x]." ".$lastName[$x];
  }
  echo json_encode($returnObj);
?>