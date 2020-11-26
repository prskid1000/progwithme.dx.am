<?php
$mysqli=new mysqli("fdb21.awardspace.net","2734291_data","password","2734291_data","3306");
$data="";
$query="SELECT * FROM app WHERE sender='".$_GET['userid']."' AND data='list'";
$result=$mysqli->query($query);
while($row =$result->fetch_assoc())
{
$data.=$row['receiver'];
$data.=" ";
}
echo $data;
?>
