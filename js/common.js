$(function(){
    $('#right').css({"width": ($('#container').width()-250)+'px'}); 
    $('#logout').click(function(){
        $.cookie('user-info', '', {expires: new Date('1997/01/01'), path: '/'});
        $(window).attr('location',"./login.html");
    })
    $('#menu').metisMenu(); 
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
    }
    
})