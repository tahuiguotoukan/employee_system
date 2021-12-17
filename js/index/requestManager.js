function reqLogin(username, passwork)
{
    commonRequest({
        type: 'POST',
        url: CGI_NAME_LIST.LOGIN,
        data:{
            admin: username,
            passwork:passwork
        },
        success: function(obj){
                info = obj;
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
    commonRequest({
        type: 'POST',
        url: CGI_NAME_LIST.QUERY_ON_JOB_LIST,
        data:data,
        // xhrFields: {
        //     withCredentials: true //允许跨域带Cookie
        // },
        success: function(obj){
                window.base_data = obj.data;
                window.totalEmployCount = obj.totalCount;
                window.members = obj.member;
                renderPage($('#tab4_1'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_1'));
        }
    })
}
function reqOnJobPagelistInfo (start, success)
{
    data = window.search_params;
    data.browseIndex = start*one_page_count;
    console.error('请求分页参数', data)
    console.error('开始位置'+data.browseIndex+' 第' + (Math.floor(data.browseIndex/one_page_count)+1) + '页');
    saveGlobalSearchParams(data);
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.QUERY_ON_JOB_LIST,
        data: data,
        success: (obj) => {
                window.base_data = obj.data;
                window.totalEmployCount = obj.totalCount;
                renderPage($('#tab4_1'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_1'));
                success && success();
        }
    })
}
function reqLeavePagelistInfo (start, success)
{
    data = window.leave_search_params;
    data.browseIndex = start*one_page_count;
    console.error('请求分页参数', data)
    console.error('开始位置'+data.browseIndex+' 第' + (Math.floor(data.browseIndex/one_page_count)+1) + '页');
    saveGlobalLeaveSearchParams(data);
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.QUERY_OFF_JOB_LIST,
        data: data,
        success: (obj) => {
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            if(textStatus === 'success')
            {
                renderPage($('#tab4_2'), Math.floor(data.browseIndex/one_page_count)+1);
                renderTable($('#tab4_2'));
                success && success();
            }
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
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.QUERY_ON_JOB_LIST,
        data: data,
        success: (obj) => {
            console.error('高级查询结果', obj);
            window.base_data = obj.data;
            window.totalEmployCount = obj.totalCount;
            window.members = obj.member;
            renderPage($('#tab4_1'));
            success && success();
        }
    })
}
function reqLeaveSuperSearch (data, success)
{
    data.browseCount = one_page_count;
    saveGlobalLeaveSearchParams(data);
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.QUERY_OFF_JOB_LIST,
        data: data,
        success: (obj) => {
            console.error('高级查询结果', obj);
            window.base_data = obj.data;
            window.totalEmployCount = obj.totalCount;
            window.members = obj.member;
            renderPage($('#tab4_2'));
            success && success();
        }
    })
}
function reqDeleteEmployee (id, success)
{
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.DELETE,
        data: {id: id, token: getLoginToken()},
        success: (obj) => {
            console.log('删除员工', obj.result);
            window.totalEmployCount-=1;
            renderPage($('#tab4_1'));
            success && success();
        }
    })
}
function reqSaveEmployeeInfo(datas)
{
    let d = [];
    //测试代码
    let l = 1;
    for(let i = 0; i < l; i++)
    {
        d[i] = datas;
    }
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.ADD,
        data: {data: d, token: getLoginToken},
        success: (obj) => {
            alert('保存成功！');
            initEmployeeForm();
            showEmployeeList(true, 'updateTime');
        }
    })
}
function reqUpdateEmployeeInfo(data)
{
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.UPDATE,
        data: data,
        success: (obj) => {
            alert('更新成功！');
            initEmployeeForm();
            showEmployeeList(true, 'updateTime');
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
    console.error('查询离职列表数据 start index is ' + data.browseIndex + '; count is ' + one_page_count);
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.QUERY_OFF_JOB_LIST,
        data: data,
        success: (obj) => {
            window.base_data = obj.data;
            window.totalEmployCount = obj.totalCount;
            window.members = obj.member;
            renderPage($('#tab4_2'), Math.floor(data.browseIndex/one_page_count)+1);
            renderTable($('#tab4_2'));
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
    commonRequest({
        type: "POST",
        url: CGI_NAME_LIST.UPDATE,
        data: data,
        success: (obj) => {
            alert('更新成功！');
            callback && callback();
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
