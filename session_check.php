<?php
    //防跳墙
    session_start();
    if (!isset($_SESSION['username'])) {
        header('Location:login.html');
    }
?>