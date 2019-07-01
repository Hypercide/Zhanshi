<?php
	$type = $_POST['type'];
	$now_id = $_POST['now_id'];

	require('connect.php');
	$sql="select * from category where category_type=$type";
	$query=$pdo->query($sql);
	$result=$query->fetchall();
	$str="";
	if($result){
		$str.="<select name='category_id'>";
		foreach ($result as $row){
			$id=$row["category_id"];
			$category_name=$row["category_name"];
			if($now_id==$id){
				$str.="<option value='$id' selected>".$category_name."</option>";
			}else{
				$str.="<option value='$id'>".$category_name."</option>";
			}
		}
		$str.="</select>";
	}
	$data = array(
		"data" => $str
	);

	echo json_encode($data);
 ?>