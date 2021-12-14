function reqLogin(username, passwork)
{
    $.ajax({
        type: 'POST',
        url: cgi+'login',
        data:{
            admin: username,
            passwork:passwork
        },
        success: function(obj){
            console.error('登录结果', obj);
            let ret = obj.ret;
            if(ret === 0)
            {
                info = obj.result;
                $.cookie('user-info', JSON.stringify(info), {expires: 7, path: '/'});
                let history = $.cookie('history');
                $.cookie('history', '', {path:'/', expires: new Date('1997/01/01')});
                if(history != null)
                {
                    $(window).attr('location',history);
                }
                else
                {
                    $(window).attr('location',"./index.html");
                }
                
                
            }
            else
            {
                alert(obj.result);
            }
        }
    })
}
function reqOnJoblistInfo(start, data={})
{
    if(start != null)
    {
        data.browseIndex = start;
    }
    else if(search_params && search_params.browseIndex != null)
    {
        data.browseIndex = search_params.browseIndex;
    }
    else
    {
        data.browseIndex = 0;
    }
    data.browseCount = one_page_count;
    saveGlobalSearchParams(data);
    data.token = getLoginToken();
    console.error('查询基础列表数据 start index is ' + data.browseIndex + '; count is ' + one_page_count);
    $.ajax({
        type: 'POST',
        url: cgi+'browseOnTheJob',
        data:data,
        // xhrFields: {
        //     withCredentials: true //允许跨域带Cookie
        // },
        success: function(obj){
            console.error('data', obj);
            if(obj.ret === 0 && obj.result)
            {
                window.base_data = obj.result.data;
                window.totalEmployCount = obj.result.totalCount;
                window.members = obj.result.member;
                renderPage($('#tab4_1'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_1'));
            }
            else if(obj.ret === -1)
            {
                guideToLoginPanel();
            }
            else
            {
                alert(obj.result);
            }
        }
    })
}
function reqOnJobPagelistInfo (start, success)
{
    data = window.search_params;
    data.browseIndex = start*one_page_count;
    console.error('请求分页参数', data)
    console.error('开始位置'+start+' 第' + Math.floor(start/one_page_count)+1 + '页');
    saveGlobalSearchParams(data);
    data.token = getLoginToken();
    $.post(cgi+'browseOnTheJob', data, function(obj, textStatus){
        console.error('分页数据回包', obj);
        if(obj.ret === 0 && obj.result)
        {
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            if(textStatus === 'success')
            {
                renderPage($('#tab4_1'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_1'));
                success && success();
            }
        
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqLeavePagelistInfo (start, success)
{
    data = window.leave_search_params;
    data.browseIndex = start*one_page_count;
    console.error('请求分页参数', data)
    console.error('开始位置'+start+' 第' + Math.floor(start/one_page_count)+1 + '页');
    saveGlobalLeaveSearchParams(data);
    data.token = getLoginToken();
    $.post(cgi+'browseOffTheJob', data, function(obj, textStatus){
        console.error('分页数据回包', obj);
        if(obj.ret === 0 && obj.result)
        {
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            if(textStatus === 'success')
            {
                renderPage($('#tab4_2'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_2'));
                success && success();
            }
        
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqKeyWordSearch(keyword)
{
    console.log(keyword);
}

function reqLocalCfg (callback)
{
    if(!localConfig)
    {
        $.post(cgi+'loadConfig', function(obj){
            if(obj.ret === 0)
            {
                console.log('配置文件', obj.result);
                // localConfig = obj.result[0];
                RenderLocalConfig();
                callback && callback();
            }
            else if(obj.ret === -1)
            {
                guideToLoginPanel();
            }
            else
            {
                alert(obj.result);
            }
        })
    }
    else
    {
        callback && callback();
    }
    
}
function reqOnJobSuperSearch (data, success)
{
    data.browseCount = one_page_count;
    saveGlobalSearchParams(data);
    data.token = getLoginToken();
    $.post(cgi+'browseOnTheJob', data, function(obj){
        if(obj.ret === 0)
        {
            console.error('高级查询结果', obj.result);
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            window.members = obj.result.member;
            renderPage($('#tab4_1'));
            success && success();
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqLeaveSuperSearch (data, success)
{
    data.browseCount = one_page_count;
    saveGlobalLeaveSearchParams(data);
    data.token = getLoginToken();
    $.post(cgi+'browseOffTheJob', data, function(obj){
        if(obj.ret === 0)
        {
            console.error('高级查询结果', obj.result);
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            window.members = obj.result.member;
            renderPage($('#tab4_2'));
            success && success();
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqDeleteEmployee (id, success)
{
    $.post(cgi+'delete', {id: id, token: getLoginToken()}, function(obj){
        if(obj.ret === 0)
        {
            console.log('删除员工', obj.result);
            window.totalEmployCount-=1;
            renderPage($('#tab4_1'));
            success && success();
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqSaveEmployeeInfo(datas)
{
    let d = {};
    //测试代码
    let l = 1;
    for(let i = 0; i < l; i++)
    {
        d[i] = datas;
    }
    
    $.post(cgi+'add', {data: d, token: getLoginToken}, function(obj){
        console.error('save data', obj);
        if(obj.ret === 0)
        {
            alert('保存成功！');
            initEmployeeForm();
            showEmployeeList(true, 'updateTime');
            
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqUpdateEmployeeInfo(data)
{
    data.token = getLoginToken();
    $.post(cgi+'update', data, function(obj){
        console.error('update data', obj);
        if(obj.ret === 0)
        {
            alert('更新成功！');
            initEmployeeForm();
            showEmployeeList(true, 'updateTime');
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqLeaveJoblistInfo (start, data={})
{
    if(start != null)
    {
        data.browseIndex = start;
    }
    else if(leave_search_params && leave_search_params.browseIndex != null)
    {
        data.browseIndex = leave_search_params.browseIndex;
    }
    else
    {
        data.browseIndex = 0;
    }
    //默认按离职时间排序
    if(leave_search_params && leave_search_params.sortName == null)
    {
        console.log('按离职时间排序');
        leave_search_params.sortName = 'offJobTime';
        leave_search_params.sortType = -1;
    }
    data.browseCount = one_page_count;
    saveGlobalLeaveSearchParams(data);
    data.token = getLoginToken();
    console.error('查询离职列表数据 start index is ' + data.browseIndex + '; count is ' + one_page_count);
    $.post(cgi+'browseOffTheJob', data, function(obj, textStatus){
        console.error('离职data', obj);
        if(obj.ret === 0 && obj.result)
        {
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            window.members = obj.result.member;
            if(textStatus === 'success')
            {
                renderPage($('#tab4_2'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_2'));
            }
        
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqLeave(id, offJobTime, offJobInfoNotes = '')
{
    let data = {
        id: id,
        offJobTime: offJobTime,
        offJobInfoNotes: offJobInfoNotes,
        jobStatus: 0
    }
    updateJobStatusInfo(data, ()=>{
        reqOnJoblistInfo(search_params.browseIndex, search_params);
    });
}
function reqRegain(id)
{
    let data = {
        id: id,
        jobStatus: 1
    }
    updateJobStatusInfo(data, ()=>{
        reqLeaveJoblistInfo(leave_search_params.browseIndex, leave_search_params);
    });
}
function reqUpdateLeaveComment (id, offJobInfoNotes)
{
    let data = {
        id: id,
        offJobInfoNotes: offJobInfoNotes,
    }
    updateJobStatusInfo(data, ()=>{
        reqLeaveJoblistInfo(search_params.browseIndex, search_params);
    });
}
function updateJobStatusInfo(data, callback)
{
    console.error('离职信息', data);
    data.token = getLoginToken();
    $.post(cgi+'update', data, function(obj){
        console.error('update leave data', obj);
        if(obj.ret === 0)
        {
            alert('更新成功！');
            callback && callback();
        }
        else if(obj.ret === -1)
        {
            guideToLoginPanel();
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqDescSortInfo(tab, key)  //升序
{
    if(tab.attr('id') === 'tab4_1')
    {
        search_params.sortName = key;
        search_params.sortType = -1;
        reqOnJoblistInfo(0, search_params);
    }
    else if(tab.attr('id') === 'tab4_2')
    {
        leave_search_params.sortName = key;
        leave_search_params.sortType = -1;
        reqLeaveJoblistInfo(0, leave_search_params);
    }
}
function reqAscSortInfo(tab, key) //降序
{
    if(tab.attr('id') === 'tab4_1')
    {
        search_params.sortName = key;
        search_params.sortType = 1;
        reqOnJoblistInfo(0, search_params);
    }
    else if(tab.attr('id') === 'tab4_2')
    {
        leave_search_params.sortName = key;
        leave_search_params.sortType = 1;
        reqLeaveJoblistInfo(0, leave_search_params);
    }
}
function reqNotSortInfo(tab, key)  //去掉排序
{
    if(tab.attr('id') === 'tab4_1')
    {
        search_params.sortName = '';
        search_params.sortType = 1;
        reqOnJoblistInfo(0, search_params);
    }
    else if(tab.attr('id') === 'tab4_2')
    {
        leave_search_params.sortName = key;
        leave_search_params.sortType = 1;
        reqLeaveJoblistInfo(0, leave_search_params);
    }
}

function getRequestParams(param){
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
