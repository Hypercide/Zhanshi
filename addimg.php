<?php 
	$files = $_FILES['pics'];
	$temp = addimg($files);
	echo json_encode($temp);

	function getExt($filename)
	{
		$arr = explode(".",$filename);
		$max = count($arr)-1;
		return $arr[$max];
	}
	function addimg($files){
		$filename = "";
		
		$ext = strtolower(getExt($files["name"]));
		
		$filename = time().rand(100,9999).".".$ext;
		move_uploaded_file($files["tmp_name"], "images/".$filename);

		$data = array(
			"code" => 0,
			"msg" => "",
			"data" => $filename
		);
		return $data;
	}
?>