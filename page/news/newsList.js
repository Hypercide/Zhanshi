layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#newsList',
        url : 'newsList.php',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 10,
        limits : [10,15,20,25],
        id : "newsListTable",
        cols : [[
            {type: "checkbox", width:50},
            {field: 'news_id', title: 'ID', width:50, align:"center"},
            {field: 'news_title', title: '文章标题', minWidth:300},
            {field: 'news_keyword', title: '关键字', width:150,align:'center',templet:"#newsStatus"},
            {field: 'news_top', title: '是否置顶', width:100,align:'center', templet:function(d){
                return '<input type="checkbox" name="newsTop" lay-event="top" lay-filter="newsTop" lay-skin="switch" lay-text="是|否" '+d.news_top+'>'
            }},
            {field: 'news_type', title: '分类', width:100,align:'center'},
            {field: 'news_addtime', title: '发布时间',width:170, align:'center',templet:function(d){
                return formatDate('Y-m-d H:i:s',d.news_addtime);
            }},
            {title: '操作', width:170, templet:'#newsListBar',align:"center"}
        ]]
    });

    //是否置顶
    form.on('switch(newsTop)', function(data){
        alert("aaa");
        var temp = JSON.stringify(data);
        alert(temp);
        // // var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        // // $.get("userDelete.php",{
        // //     id : data.id  //将需要删除的userId作为参数传入
        // // },function(data){
        // //     layer.close(index);
        // //     if(data.elem.checked){
        // //         layer.msg("置顶成功！");
        // //     }else{
        // //         layer.msg("取消置顶成功！");
        // //     }
        // // })
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("newsListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

    //添加文章
    function addNews(edit){
        var index = layui.layer.open({
            title : "添加文章",
            type : 2,
            content : "newsAdd.html",
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
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(newsList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                    tableIns.reload();
                    layer.close(index);
                // })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

})