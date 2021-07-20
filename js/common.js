var cgi = 'http://192.168.1.138:3000/';
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
$(function(){
    $('#right').css({"width": ($('#container').width()-250)+'px'}); 
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