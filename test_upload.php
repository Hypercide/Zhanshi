<?php
function getExt($filename)
{
   $arr = explode('.',$filename);
   return array_pop($arr);;
}
$file = $_FILES["pic"];
$newname = time().".".getExt($file["name"]);
move_uploaded_file($file["tmp_name"], "./up/$newname");
$data = ["code"=>0,"msg"=>"ok","data"=>array("src"=>"./up/1.jpg")];
echo json_encode($data);
 ?>