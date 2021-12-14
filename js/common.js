// var cgi = 'http://119.45.16.105:3000/';  //正式服
var cgi = 'http://192.168.1.23:3000/';  // 测试服
var one_page_count = $.cookie('one_page_count')*1;

if(!one_page_count || isNaN(one_page_count))
{
    one_page_count = 12;
    $.cookie('one_page_count', one_page_count, {expires: new Date('2200-01-02'), path: '/'});
}

function commonRequest ({
    type = 'GET', url, data, success, fail
})
{
    data && (data.token = getLoginToken());
    $.ajax({
        type: type,
        url: url,
        data:data,
        success: function(obj){
            let ret = obj.ret;
            if(ret === 0)
            {
                success && success(obj.result);
            }
            else if(obj.ret === -1)
            {
                guideToLoginPanel();
            }
            else
            {
                alert(obj.result);
                fail && fail(-1);
            }
        },
        error: function()
        {
            console.error('request ' + cgi + ' error');
            fail && fail(-1);
        }
    })
}
function guideToLoginPanel()
{
    alert('状态已过期，请重新登录');
    $.cookie('history', window.location.href, {path: '/'});
    $(window).attr('location',"./login.html");
}
function getLoginToken()
{
    let info = $.cookie('user-info');
    try{
        info = JSON.parse(info);
        return info.session;
    }
    catch(err){
        console.error('parse user info error ',err);
        return null;
    }
    
}
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
function ShowTabByManagerLevel ()
{
    let user_info = $.cookie('user-info');
    try{
        user_info = JSON.parse(user_info);
        console.error(user_info);
        if(user_info.auth*1 === 0)
        {
            _ShowTabByManagerLevel(super_show);
        }
        else
        {
            _ShowTabByManagerLevel(normal_show);
        }
        
    }
    catch
    {
        _ShowTabByManagerLevel(normal_show);
    }
}
function _ShowTabByManagerLevel (list)
{
    let tab_list = getTabList(list);
    let tab_nodes = $('ul#menu>li');
    for(let i = 0; i < tab_nodes.length; i++)
    {
        let item = tab_nodes.eq(i);
        if(tab_list.indexOf(i) > -1)
        {
            item.show();
        }
        else
        {
            item.hide();
        }
    }
    let file_list = getFileList(list);
    let address = document.URL;
    let boo = false;
    for(let i = 0; i < file_list.length; i++)
    {
        if(address.indexOf(file_list[i]) > -1)
        {
            boo = true;
            break;
        }
    }
    //用户权限不能展示当前页面
    !boo && $(window).attr('location',"./index.html");
}
function getTabList (data)
{
    let tab_list = [];
    data.forEach(function(v) {
        tab_list.push(v.tab);
    })
    return tab_list;
}
function getFileList(data)
{
    let file_list = [];
    data.forEach(function(v) {
        file_list.push(v.file);
    })
    return file_list;
}
function GetPositionNameByVal (pos)
{
    let department_cfg = localConfig.department;
    for(let i = 0; i < department_cfg.length; i++)
    {
        let item = department_cfg[i];
        
        let pos_cfg = item.position;
        for(let j = 0; j < pos_cfg.length; j++)
        {
            let item2 = pos_cfg[j];
            if(item2.val == pos)
            {
                return item2.name;
            }
        }
    }
    return ''; 
}
function GetWorkGroupNameByVal (group)
{
    let department_cfg = localConfig.department;
    for(let i = 0; i < department_cfg.length; i++)
    {
        let item = department_cfg[i];
        
        let pos_cfg = item.workGroup;
        for(let j = 0; j < pos_cfg.length; j++)
        {
            let item2 = pos_cfg[j];
            if(item2.val == pos)
            {
                return item2.name;
            }
        }
    }
    return ''; 
}
function GetDepartmentNameByVal (val)
{
    let department_cfg = localConfig.department;
    for(let i = 0; i < department_cfg.length; i++)
    {
        let item = department_cfg[i];
        
        if(item.val == val)
        {
            return item.name;
        }
    }
    return ''; 
}
function GetDepartmentInfoByVal (val)
{
    let department_cfg = localConfig.department;
    for(let i = 0; i < department_cfg.length; i++)
    {
        let item = department_cfg[i];
        
        if(item.val == val)
        {
            return item;
        }
    }
    return null; 
}
$(function(){
    $('#right').css({"width": ($('#container').width()-250)+'px'}); 
    ShowTabByManagerLevel(); //校验权限
    $('#logout').click(function(){
        $.cookie('user-info', '', {expires: new Date('1997/01/01'), path: '/'});
        $(window).attr('location',"./login.html");
    })
    $('#menu').length > 0 && $('#menu').metisMenu(); 
    $('#menu li a').click(function (){
        $(window).attr('location',$(this).attr('href'));
    })
    let info = $.cookie('user-info');
    try{
        info = JSON.parse(info);
        $('#user-name').text(info.user);
    }
    catch(err){
        console.error('pase user info error',err);
        $('#user-name').text('游客');
    }
    
})