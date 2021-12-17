function reqBaseInfo(data, success)
{
    data.browseIndex = 0;
    data.browseCount = one_page_count,
    data.sortType = -1,  //默认最新的展示在最前面
    data.isTaoTai = 0    //是否淘汰，1：是；0：不是

    //测试代码
    // {
    //     let ind = 8001;
    //     let len = 10;
    //     for(let i = 8001; i < ind + 10; i++)
    //     {
    //         first_select_info.data.push({
    //             id: i,				//编号
    //             name: '测试'+i,			//姓名
    //             phoneNumber:11111111111,		//联系方式
    //             sex: 0, 			//性别 ['男','女']
    //         })
    //     }
    //     success && success();
    //     return;
    // }
    
    commonRequest({
        type: 'POST',
        url: CGI_NAME_LIST.QUERY_ADMIN_LIST,
        data:data,
        success: function(info)
        {
            console.error('查询管理员列表', info);
            first_select_info = info;
            success && success();
        }
    })
    
}
function reqAddManager (data, success)
{
    commonRequest({
        type: 'POST',
        url: CGI_NAME_LIST.ADD_ADMIN,
        data:data,
        success: function(info)
        {
            console.error('新增管理员账号', info);
            success && success();
        }
    })
}
function reqEditManager (data, success)
{
    commonRequest({
        type: 'POST',
        url: CGI_NAME_LIST.UPDATE_ADMIN,
        data:data,
        success: function(info)
        {
            console.error('编辑管理员账号', info);
            success && success();
        }
    })
}