<?php
    $user = @$_POST["user"];
    $pwd = @$_POST["pwd"];
  
    if($user == "" || $pwd== ""){
        die("参数不全,缺少账号或密码");
    }
    $con = mysql_connect("localhost","root","123456");
    if(!$con){
        die("数据库连接失败" . mysql_error());
    }
 
    mysql_select_db("userlist" , $con);
    if(mysql_error()){
        die("数据库选中失败".mysql_error());
    }
    // 如果用户名重复, 因为我们没有逻辑进行判断,所以同用户名的数据可以重复插入;
    // 辨别用户名是否存在; 如果存在 , 阻止写入数据库;

    $sql_select_all = "SELECT user,pwd FROM jdlist WHERE user='$user'";

    // 查询结果;
    $select_res = mysql_query($sql_select_all);

    // die($select_res);
    // 遍历数据库资源方式;
    while($row = mysql_fetch_array($select_res)){
    
        if($row["pwd"] == $pwd){
            die("登陆成功");
        }
    }

    echo "登陆失败";
  
    
    mysql_close($con);
?>