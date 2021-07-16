function reqFirstSelectInfo(data, success)
{
    data.browseIndex = 0;
    data.browseCount = one_page_count,
    data.sortType = -1,  //默认最新的展示在最前面
    data.isTaoTai = 0    //是否淘汰，1：是；0：不是

    //测试代码
    {
        let ind = 8001;
        let len = 10;
        for(let i = 8001; i < ind + 10; i++)
        {
            first_select_info.push({
                id: i,				//编号
                name: '测试'+i,			//姓名
                bornTime:(new Date()).Format('yyy-MM-dd'),		//出生时间 "yyyy-mm-dd"
                phoneNumber:11111111111,		//联系方式

                sex: 0, 			//性别 ['男','女']
                department:0,		//部门 ['研发部','行政部','美术部',……]
                education:0,		//学历 ['小学','初中','高中',……]
                post:[0],				//职位 ["UI","原画","3D模型", ……] 可多个
                projectGroup:[0],		//项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个

                yingPinDiDian: 0,	//应聘地点
                fuZeRen:0,			//负责人
                zhaoPinJinCheng:0,	//招聘进度
                luRuShiJian:(new Date()).Format('yyy-MM-dd'),		//简历录入时间
                
                daoRuJianLi:'',		//导入简历，buffer类型数据
                
                notes:'测试',			//备注
                isZhuanMianShi: 0,	//是否转面试，1：是；0：不是
                isTaoTai: 0,		//是否淘汰，1：是；0：不是
                
                updateTime:(new Date()).Format('yyy-MM-dd'),		//数据更新时间
            })
        }
        success && success();
        return;
    }
    
    commonRequest({
        type: 'POST',
        url: cgi+'browseChuShaiInfo',
        data:data,
        success: function(info)
        {
            console.error('初筛查询', info);
            first_select_info = info;
            success && success();
        }
    })
    
}