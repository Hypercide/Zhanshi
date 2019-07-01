<?php 
	$username = $_POST['username'];
	$password = $_POST['password'];
	$password = md5($password);

	require('connect.php');

	$pdo->query('set names utf8');
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
	$sql="select username, profilephoto from user where username='{$username}' and password='{$password}'";
	$rs=$pdo->query($sql);
	$result=$rs->fetch(PDO::FETCH_ASSOC);
	$arr['digit'] = '1';
	
	if ($result) {
	    //echo '登录成功！欢迎你，'.$result['nickname'];
	    $time=time();
	    // echo date('Y-m-d H:i:s',$time);
	    $sql="UPDATE user SET lastlogintime='{$time}' where username='{$username}'";
	   	$pdo->query($sql);
	    // header('Location:list.php');
	    $arr['username'] = $result['username'];
	    $arr['profilephoto'] = $result['profilephoto'];
	    echo json_encode($arr);
	}else{
	    $arr['digit'] = '2';
	    echo json_encode($arr);
	}
 ?>