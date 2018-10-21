<?php
    $user=@$_POST["user"];
    $pwd=@$_POST["pwd"];
    $restPwd=@$_POST["restPwd"];
    $email=@$_POST["email"];
    if($user==""||$pwd==""||$restPwd==""||$email==""){
        die("对不起，不允许有空项");
    }
    $con=mysql_connect("localhost","root","123456");
    if(!$con){
        die("连接数据库失败".mysql_error());
    }
    mysql_select_db("userlist",$con);
    if(mysql_error()){
        die("数据库选中失败".mysql_error());
    }
    $sql_select_all="SELECT user FROM jdlist WHERE user='$user'";
    $select_res=mysql_query( $sql_select_all);
    while($row=mysql_fetch_array($select_res)){
        if($row["user"]==$user){
            die("用户名重名");
        }
    }
    $sql_insert_item = "INSERT INTO jdlist (user,pwd,restPwd,email) 
                        VALUES
                        ('$user','$pwd','$restPwd','$email');
                        ";
    $insert_res = mysql_query($sql_insert_item);
    if(!$insert_res){
        echo "数据库插入错误".mysql_error();
    }
    echo "恭喜注册成功";
    mysql_close($con);
?>