layui.use(['form','layer','layedit','laydate','upload'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        $ = layui.jquery;

    $.ajax({
        type:"POST",
        url:"../../getselect.php",
        data:"type=5&now_id=0",
        dataType:"json",
        success: function(data){
            $(".category_block").html(data.data);
            form.render();
        }
    });

    //用于同步编辑器内容到textarea


    //上传缩略图
    // upload.render({
    //     elem: '.thumbBox',
    //     url: '../../json/userface.json',
    //     method : "get",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
    //     done: function(res, index, upload){
    //         var num = parseInt(4*Math.random());  //生成0-4的随机数，随机显示一个头像信息
    //         $('.thumbImg').attr('src',res.data[num].src);
    //         $('.thumbBox').css("background","#fff");
    //         $('.msg').text('');
    //     }
    // });


    //创建一个编辑器
    var editIndex = layedit.build('news_content',{
        height : 400,
        uploadImage : {
            url : "../../json/newsImg.json"
        }
    });


    var upload = layui.upload;
        //普通图片上传
        //执行实例
    var uploadInst = upload.render({
        elem: '.thumbBox' //绑定元素
        ,url: '../../addimg.php' //上传接口PHP 接收文件
        ,field:'pics'
        ,auto: false
        ,bindAction:'.ListAction'
        ,accept: 'image'
        ,exts: 'jpg|png|gif|jpeg'
        ,choose: function(obj){
            //预读本地文件示例，不支持ie8
            $(".isupload").val('1');
            obj.preview(function(index, file, result){
                $('.thumbImg').attr('src', result);
            });
            $('.msg').text('');
        }
        ,done: function(res){
            // var files = JSON.stringify(res);
            // alert(res['data']);
            $("#thumbnail").val(res['data']);
            //上传完毕回调
        }
        ,error: function(){
          //请求异常回调
        }
    });
    

    $(".addNews").click(function(){
        $(".addNews").text("发布中...").prop("disabled", true).addClass("layui-disabled");
        $(".ListAction").click();
        setTimeout("upform()",100);
        return false;
    })

    $(".saveNews").click(function(){
        layedit.sync(editIndex);
        var temp=$("#addNewsform").serialize();
        console.log(temp);
        $.ajax({
            type:"POST",
            url:"newsAdd.php",
            data:temp,
            dataType:"json",
            success: function(msg){
                console.log(msg);
                if(msg.digit==1)
                {
                    // top.layer.close(index);
                    top.layer.msg("新闻发布成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                }
                else
                {
                    // layer.alert("用户名或密码错误");
                    $(".addNews").text("发布").prop("disabled", false).removeClass("layui-disabled");
                }
            }
        });
        return false;
    });

})

    //延长事件等待后台完成图片上传
    function upform(){
        if($(".isupload").val()){
            if($("#thumbnail").val()!=''){
                $(".saveNews").click();
            }
            else{
                setTimeout("upform()",100)
            }
        }else{
                $(".saveNews").click();
        }
    }