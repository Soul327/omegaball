<?php
  require_once realpath($_SERVER["DOCUMENT_ROOT"])."/res/secure/database.php";
  require_once realpath($_SERVER["DOCUMENT_ROOT"])."/res/lib.php";

  $returnObj = [];

  $uid = $_POST["uid"];

  $conn = connectDB("newOmegaball");
  $query = "SELECT * FROM User WHERE uid='$uid'";
  $result = runQuery($conn, $query);
  $returnObj = $result->fetch_assoc();

  $conn = connectDB("account");
  $query = "SELECT username FROM User WHERE uid='$uid'";
  $result = runQuery($conn, $query);
  $row = $result->fetch_assoc();
  $returnObj["username"] = $row["username"];

  echo json_encode( $returnObj );
?>