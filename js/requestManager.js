var cgi = 'http://192.168.1.81:3000/';
function reqLogin(username, passwork)
{
    $.post(cgi+'login', {admin: username, passwork:passwork}, function(obj){
        console.error('登录结果', obj);
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
    console.error('查询基础列表数据 start index is ' + data.browseIndex + '; count is ' + one_page_count);
    $.post(cgi+'browseOnTheJob', data, function(obj, textStatus){
        console.error('data', obj);
        if(obj.ret === 0 && obj.result)
        {
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            window.members = obj.result.member;
            if(textStatus === 'success')
            {
                renderPage($('#tab4_1'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_1'));
            }
        
        }
        else
        {
            alert(obj.result);
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
        else
        {
            alert(obj.result);
        }
    })
}
function reqDeleteEmployee (id, success)
{
    $.post(cgi+'delete', {id: id}, function(obj){
        if(obj.ret === 0)
        {
            console.log('删除员工', obj.result);
            window.totalEmployCount-=1;
            renderPage($('#tab4_1'));
            success && success();
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
    $.post(cgi+'add', d, function(obj){
        console.error('save data', obj);
        if(obj.ret === 0)
        {
            alert('保存成功！');
            initEmployeeForm();
            showEmployeeList(true, 'updateTime');
            
        }
        else
        {
            alert(obj.result);
        }
    })
}
function reqUpdateEmployeeInfo(datas)
{
    $.post(cgi+'update', datas, function(obj){
        console.error('update data', obj);
        if(obj.ret === 0)
        {
            alert('更新成功！');
            initEmployeeForm();
            showEmployeeList(true, 'updateTime');
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
    data.browseCount = one_page_count;
    saveGlobalLeaveSearchParams(data);
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
        reqLeaveJoblistInfo(search_params.browseIndex, search_params);
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
    $.post(cgi+'update', data, function(obj){
        console.error('update leave data', obj);
        if(obj.ret === 0)
        {
            alert('更新成功！');
            callback && callback();
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