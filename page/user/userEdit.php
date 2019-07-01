<?php
	require('../../connect.php');
	header("Content-type: text/html; charset=utf-8");
	$id = $_POST['id'];
	$username = $_POST['username'];
	$password = $_POST['password'];
	$password = md5($password);
	$email = $_POST['email'];
	$level = $_POST['level'];
	$profilephoto = $_POST['profilephoto'];
	$array = ['digit'=>1];
    $sql="update user set 	username='{$username}',
							password='{$password}',
							email='{$email}',
							level='{$level}',
							profilephoto='{$profilephoto}'
							where id = '{$id}'";
	if($pdo->exec($sql))
	{
		echo json_encode($array);
	}
	else{
		$array = ['digit'=>2];
		echo json_encode($array);
	}
	
 ?>