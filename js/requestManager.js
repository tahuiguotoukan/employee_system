var cgi = 'http://192.168.1.81:3000/';
function reqOnJoblistInfo(start)
{
    let data = {
        'browseIndex': start, "browseCount": one_page_count
    }
    saveGlobalSearchParams(data);
    console.error('查询基础列表数据 start index is ' + start + '; count is ' + one_page_count);
    $.post(cgi+'browseOnTheJob', data, function(obj, textStatus){
        console.error('data', obj);
        if(obj.ret === 0 && obj.result)
        {
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            if(textStatus === 'success')
            {
                renderPage(Math.floor(start/one_page_count)+1);
                renderTable();
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
    $.post(cgi+'browseOnTheJob', data, function(obj, textStatus){
        console.error('分页数据回包', obj);
        if(obj.ret === 0 && obj.result)
        {
            window.base_data = obj.result.data;
            window.totalEmployCount = obj.result.totalCount;
            if(textStatus === 'success')
            {
                renderPage(Math.floor(data.browseIndex/one_page_count)+1);
                renderTable();
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
                localConfig = obj.result[0];
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
            renderPage();
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
            renderPage();
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
        console.error('save data', obj);
        if(obj.ret === 0)
        {
            alert('更新成功！');
            initEmployeeForm();
        }
        else
        {
            alert(obj.result);
        }
    })
}