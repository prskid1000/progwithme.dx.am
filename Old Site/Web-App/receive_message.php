<?php
$mysqli=new mysqli("fdb21.awardspace.net","2734291_data","password","2734291_data","3306");
$query="SELECT * FROM app WHERE sender='".$_GET['userid']."' AND receiver='".$_GET['receiver']."'";
$result=$mysqli->query($query);
$data="";
while($row =$result->fetch_assoc()) 
{
if($row['data']!='list')
{
$data.=$row['data'];
$data.=" ";
}
}
$data.="& ";
$query="SELECT * FROM app WHERE sender='".$_GET['receiver']."' AND receiver='".$_GET['userid']."'";
$result=$mysqli->query($query);
while($row =$result->fetch_assoc()) 
{
$data.=$row['data'];
$data.=" ";
}
$mysqli->close();
echo $data;
?>
