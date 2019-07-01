layui.use(['form','layer','table','laytpl','element'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        element = layui.element,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        url : 'userList.php',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 10,              //向后台传值
        limits : [10,15,20,25],
        id : "userListTable",
        cols : [[
            {type: "checkbox", width:50},
            {field: 'username', title: '用户名', minWidth:100, align:"center"},
            {field: 'email', title: '用户邮箱', minWidth:200, align:'center',templet:function(d){
                return '<a class="layui-blue" href="mailto:'+d.email+'">'+d.email+'</a>';
            }},
            {field: 'level', title: '用户等级', minWidth:170,align:'center',templet:function(d){
                if(d.level == "4"){
                    return "注册会员";
                }else if(d.level == "3"){
                    return "中级会员";
                }else if(d.level == "2"){
                    return "高级会员";
                }else if(d.level == "1"){
                    return "超级会员";
                }
            }},
            {field: 'lastlogintime', title: '最后登录时间', minWidth:150, align:'center',templet:function(d){
                return formatDate('Y-m-d H:i:s',d.lastlogintime);
            }},
            {title: '操作', minWidth:175, templet:'#userListBar',align:"center"}
        ]]
    });


    //查询
    $(".search_btn").click(function(){
        var userArray = [];
        if($(".searchVal").val() != ''){
            var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            $.ajax({
                url : "userList.php",
                type : "get",
                dataType : "json",
                success : function(data){
                    usersData = data.data;
                    // var temp = JSON.stringify(usersData);
                    // alert(temp);
                    console.log(usersData);
                    function changeStr(data){
                        var dataStr = '';
                        var showNum = data.split(eval("/"+selectStr+"/ig")).length - 1;
                        if(showNum > 1){
                            for (var j=0;j<showNum;j++) {
                                dataStr += data.split(eval("/"+selectStr+"/ig"))[j] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>";
                            }
                            dataStr += data.split(eval("/"+selectStr+"/ig"))[showNum];
                            return dataStr;
                        }else{
                            dataStr = data.split(eval("/"+selectStr+"/ig"))[0] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>" + data.split(eval("/"+selectStr+"/ig"))[1];
                            return dataStr;
                        }
                    }

                    for(var i=0;i<usersData.length;i++){
                        var usersStr = usersData[i];
                        var selectStr = $(".searchVal").val();
                        //用户名
                        //用户名
                        if(usersStr.username.indexOf(selectStr) > -1){
                            usersStr["username"] = changeStr(usersStr.username);
                        }
                        //用户邮箱
                        if(usersStr.email.indexOf(selectStr) > -1){
                            usersStr["email"] = changeStr(usersStr.email);
                        }
                        // //性别
                        // if(usersStr.userSex.indexOf(selectStr) > -1){
                        //  usersStr["userSex"] = changeStr(usersStr.userSex);
                        // }
                        //会员等级
                        // if(usersStr.level.indexOf(selectStr) > -1){
                        //     usersStr["level"] = changeStr(usersStr.level);
                        // }
                        if(usersStr.username.indexOf(selectStr)>-1 || usersStr.email.indexOf(selectStr)>-1){
                            userArray.push(usersStr);
                        }
                    }
                    usersData = userArray;
                    // var temp = JSON.stringify(usersData);
                    // alert(temp);
                    table.render({
                        elem : '#userList',
                        data : usersData,
                        cellMinWidth : 95,
                        page : true,
                        height : "full-125",
                        limits : [10,15,20,25],
                        limit : 10,
                        cols : [[
                            {type: "checkbox", width:50},
                            {field: 'username', title: '用户名', minWidth:100, align:"center"},
                            {field: 'email', title: '用户邮箱', minWidth:200, align:'center',templet:function(d){
                                return '<a class="layui-blue" href="mailto:'+d.email+'">'+d.email+'</a>';
                            }},
                            {field: 'level', title: '用户等级', align:'center',templet:function(d){
                                if(d.level == "4"){
                                    return "注册会员";
                                }else if(d.level == "3"){
                                    return "中级会员";
                                }else if(d.level == "2"){
                                    return "高级会员";
                                }else if(d.level == "1"){
                                    return "超级会员";
                                }
                            }},
                            {field: 'lastlogintime', title: '最后登录时间', minWidth:150, align:'center',templet:function(d){
                                return formatDate('Y-m-d H:i:s',d.lastlogintime);
                            }},
                            {title: '操作', minWidth:175, templet:'#userListBar',align:"center"}
                        ]]
                    });
                }
            })
                
            layer.close(index);
        }else{
            layer.msg("请输入需要查询的内容");
        }
    })
    //添加用户
    function addUser(edit){
        var index = layui.layer.open({
            title : "添加用户",
            type : 2,
            content : "userAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    form.render();
                }
            }
        })
        layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }
    $(".addNews_btn").click(function(){
        addUser();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('userListTable'),
            data = checkStatus.data,
            userId = [];

        if(data.length > 0) {
            for (var i in data) {
                userId.push(data[i].id);
            }
            // var temp = JSON.stringify(data);
            // alert(userId);
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.get("userDelall.php",{
                    userId : userId  //将需要删除的userId作为参数传入
                },function(data){
                    tableIns.reload();
                    layer.close(index);
                })
            })
        }else{
            layer.msg("请选择需要删除的用户");
        }
    })

    //修改信息
    function editUser(edit){
        var index = layui.layer.open({
            title : "修改信息",
            closeBtn: 1,
            type : 2,
            content : "userEdit.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    form.render();
                }
            }
        })
        layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }


    //列表操作
    table.on('tool(userList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            // var temp = JSON.stringify(data);
            // alert(temp);
            layui.sessionData('edit',{
                key: 'id'
                ,value: data.id
            });
            layui.sessionData('edit',{
                key: 'username'
                ,value: data.username
            });
            layui.sessionData('edit', {
                key: 'email',
                value: data.email
            });
            layui.sessionData('edit', {
                key: 'level',
                value: data.level
            });
            layui.sessionData('edit', {
                key: 'profilephoto',
                value: data.profilephoto
            });
            editUser();
        }else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){
                $.get("userDelete.php",{
                    id : data.id  //将需要删除的userId作为参数传入
                },function(data){
                    tableIns.reload();
                    layer.close(index);
                })
            });
        }
    });

})
