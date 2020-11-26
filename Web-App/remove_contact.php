<?php
$mysqli=new mysqli("fdb21.awardspace.net","2734291_data","password","2734291_data","3306");
$query="DELETE FROM app WHERE sender='".$_GET['userid']."' AND receiver='".$_GET['receiver']."'";
$result=$mysqli->query($query);
?>
