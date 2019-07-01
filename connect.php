<?php
    //建立数据库连接
    try{
        $dsn='mysql:host=localhost;dbname=zhanshi';
        $pdo=new PDO($dsn, 'root', 'root');
        //设置字符集为utf8
        $pdo->query('set names utf8');
        //设置PDO错误警告模式，用于调试
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
    }catch( PDOException $e){
        echo "error:". $e->getMessage() . '<br>';
        exit();
    }
?>