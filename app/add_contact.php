<?php
$mysqli=new mysqli("fdb21.awardspace.net","2734291_data","HATSoff@2018","2734291_data","3306");
$data="list";
$query="INSERT INTO app(id,sender,receiver,data) VALUES ('NULL','".$_GET['userid']."','".$_GET['receiver']."','list')";
$result=$mysqli->query($query);
$mysqli->close();
?>