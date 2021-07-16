
//回包状态码
const StatusCode = 
{
	NotLogin: -1,	//未登录
	Succeed: 0,		//成功
	Failed: 1,		//请求失败
}

//用户信息类
var UserInfo = 
{
	id:Number,		//用户id
	auth:Number,	//用户权限 0为管理员权限，1为用户权限
	user:String,	//用户名
}

//薪资信息
var SalaryInfo =
{
	money:Number,	//薪资
	time:String,	//薪资时间 按要求格式赋值
}

//面试信息
var MianShiInfo = 
{
	jinCheng:String,	//面试进程
	shiJian:String,		//面试时间  "yyyy-mm-dd hh:mm" 这里的hh为24小时制
	jieGuo:String,		//面试结果
}

//初筛备选界面部分协议
{

	////////////////////////////
	/////*增加简历请求协议*/////
	////////////////////////////

	/*
		请求接口：/addJianLi
	*/
	//协议请求数据
	req =
	{
		data:Array,				//[AddJianLi]
		token:String,
	}
	AddJianLi = 
	{
		name:String,			//姓名
		bornTime:String,		//出生时间 "yyyy-mm-dd"
		phoneNumber:String,		//联系方式

		sex:String, 			//性别 ['男','女']
		department:String,		//部门 ['研发部','行政部','美术部',……]
		education:String,		//学历 ['小学','初中','高中',……]
		post:Array,				//职位 ["UI","原画","3D模型", ……] 可多个
		projectGroup:Array,		//项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个

		yingPinDiDian: String,	//应聘地点 
		fuZeRen:String,			//负责人
		zhaoPinJinCheng:String,	//招聘进度
		luRuShiJian:String,		//简历录入时间 "yyyy-mm-dd"
		
		daoRuJianLi:Array,		//导入简历，buffer类型数据
	}

	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		userInfo: UserInfo,
	}


	////////////////////////////////////
	/////*查询初筛备选信息请求协议*/////
	////////////////////////////////////

	/*
		请求接口：/browseChuShaiInfo
	*/
	//协议请求数据
	req =
	{
		data:ReqBrowseChuShai,	//ReqBrowseChuShai
		token:String,
		
		browseIndex:Number,		//查询开始的索引
		browseCount:Number,		//查询条数
		
		sortName:String	,		//排序字段名
		sortType:Number,		//1是升序，-1是降序
		
		isTaoTai: Number,		//是否淘汰，1：是；0：不是
	}
	ReqBrowseChuShai = 
	{
		id:Array,				//编号，二元数组
		name:String,			//姓名
		bornTime:Array,			//出生时间 二元数组
		phoneNumber:String,		//联系方式

		sex:Array, 				//性别 ['男','女']
		department:Array,		//部门 ['研发部','行政部','美术部',……]
		education:Array,		//学历 ['小学','初中','高中',……]
		post:Array,				//职位 ["UI","原画","3D模型", ……] 可多个
		projectGroup:Array,		//项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个

		yingPinDiDian: Array,	//应聘地点 
		fuZeRen:Array,			//负责人
		zhaoPinJinCheng:Array,	//招聘进度
		luRuShiJian:Array,		//简历录入时间 二元数组
	}

	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		totalCount:Number,		//查询总数
		result: Array,			//查询数据结果 ResChuShaiInfo
		userInfo: UserInfo,
	}
	ResChuShaiInfo = 
	{
		id:Number,				//编号
		name:String,			//姓名
		bornTime:String,		//出生时间 "yyyy-mm-dd"
		phoneNumber:String,		//联系方式

		sex:String, 			//性别 ['男','女']
		department:String,		//部门 ['研发部','行政部','美术部',……]
		education:String,		//学历 ['小学','初中','高中',……]
		post:Array,				//职位 ["UI","原画","3D模型", ……] 可多个
		projectGroup:Array,		//项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个

		yingPinDiDian: String,	//应聘地点
		fuZeRen:String,			//负责人
		zhaoPinJinCheng:String,	//招聘进度
		luRuShiJian:String,		//简历录入时间
		
		daoRuJianLi:Array,		//导入简历，buffer类型数据
		
		notes:String,			//备注
		isZhuanMianShi: Number,	//是否转面试，1：是；0：不是
		isTaoTai: Number,		//是否淘汰，1：是；0：不是
		
		updateTime:String,		//数据更新时间
	}
	
	
	////////////////////////////////
	/////*初筛备选编辑请求协议*/////
	////////////////////////////////

	/*
		请求接口：/updateChuShaiInfo
	*/
	//协议请求数据
	req =
	{
		data:ReqUpdateChuShaiInfo,	//ReqUpdateChuShaiInfo
		token:String,
	}
	ReqUpdateChuShaiInfo = 
	{
		id:Number,				//转面试对象的id
		name:String,			//姓名
		bornTime:String,		//出生时间 "yyyy-mm-dd"
		phoneNumber:String,		//联系方式

		sex:String, 			//性别 ['男','女']
		department:String,		//部门 ['研发部','行政部','美术部',……]
		education:String,		//学历 ['小学','初中','高中',……]
		post:Array,				//职位 ["UI","原画","3D模型", ……] 可多个
		projectGroup:Array,		//项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个

		yingPinDiDian: String,	//应聘地点 
		fuZeRen:String,			//负责人
		zhaoPinJinCheng:String,	//招聘进度
		luRuShiJian:String,		//简历录入时间 "yyyy-mm-dd"
		
		daoRuJianLi:Array,		//导入简历，buffer类型数据
	}

	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		userInfo: UserInfo,
	}


	//////////////////////////
	/////*转面试请求协议*/////
	//////////////////////////

	/*
		请求接口：/updateToMianShi
	*/
	//协议请求数据
	req =
	{
		data:ReqZhuanMianShiInfo,//ReqZhuanMianShiInfo
		token:String,
	}
	ReqZhuanMianShiInfo = 
	{
		id:Number,				//转面试对象的id
	}

	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		userInfo: UserInfo,
	}

}

//面试界面部分协议
{
	
	////////////////////////////
	/////*查询面试请求协议*/////
	////////////////////////////

	/*
		请求接口：/browseMianShi
	*/
	//协议请求数据
	req =
	{
		data:ReqBrowseMianShi,	//ReqBrowseMianShi
		token:String,
				
		browseIndex:Number,		//查询开始的索引
		browseCount:Number,		//查询条数
		
		sortName:String	,		//排序字段名
		sortType:Number,		//1是升序，-1是降序
		
		isTaoTai: Number,		//是否淘汰，1：是；0：不是
	}
	ReqBrowseMianShi = 
	{
		name:String,			//姓名
		sex:Array, 				//性别 ['男','女']
		education:Array,		//学历 ['小学','初中','高中',……]
		yingPinDiDian: Array,	//应聘地点 
		fuZeRen:Array,			//负责人
		zhaoPinJinCheng:Array,	//招聘进度
		
		bornTime:Array,			//出生时间 二元数组
		luRuShiJian:Array,		//简历录入时间 二元数组	
		
		department:Array,		//部门 ['研发部','行政部','美术部',……]
		post:Array,				//职位 ["UI","原画","3D模型", ……] 可多个
		projectGroup:Array,		//项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个
	}

	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		totalCount:Number,		//查询总数
		result:Array,			//查询回包数据结构 ResBrowseMianShi
		userInfo: UserInfo,
	}
	ResBrowseMianShi = 
	{
		id:Number,				//编号
		name:String,			//姓名
		sex:String, 			//性别
		bornTime:String,		//出生时间 "yyyy-mm-dd"
		education:String,		//学历 
		phoneNumber:String,		//联系方式
		
		yingPinDiDian: String,	//面试地点
		department:String,		//面试部门
		post:Array,				//面试职位
		projectGroup:Array,		//面试项目组

		fuZeRen:String,			//负责人
		
		mianShi:Array,			//面试信息 MianShiInfo 数组
		curMSJinCheng:String,	//当前面试进程 存数组下标
		curMSShiJian:String,	//当前面试时间  "yyyy-mm-dd hh:mm" 这里的hh为24小时制
		curMSJieGuo:String,		//当前面试结果 存数组下标
		
		daoRuJianLi:Array,		//导入的简历数据，buffer类型数据，可下载查看
		
		notes:String,			//备注
		isLuYong: Number,		//是否录用，1：是；0：不是
		isTaoTai: Number,		//是否淘汰，1：是；0：不是
		
		updateTime:String,		//数据更新时间
	}
	
	
	////////////////////////////
	/////*面试编辑请求协议*/////
	////////////////////////////
	
	/*
		请求接口：/updateMianShiInfo
	*/
	//协议请求数据
	req =
	{
		data:ReqUpdateMianShi,	//ReqUpdateMianShi
		token:String,
	}
	ReqUpdateMianShi = 
	{
		id:Number,				//编号
		name:String,			//姓名
		sex:String, 			//性别
		bornTime:String,		//出生时间 "yyyy-mm-dd"
		education:String,		//学历 
		phoneNumber:String,		//联系方式
		
		yingPinDiDian: String,	//面试地点
		department:String,		//面试部门
		post:Array,				//面试职位
		projectGroup:Array,		//面试项目组

		fuZeRen:String,			//负责人
		
		mianShi:Array,			//面试信息 MianShiInfo 数组
		notes:String,			//备注
	}
	
	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		userInfo: UserInfo,
	}
	
	
	//////////////////////////////
	/////*面试转录用请求协议*/////
	//////////////////////////////
	
	/*
		请求接口：/updateToLuYong
	*/
	//协议请求数据
	req =
	{
		data:ReqUpdateToLuYong,	//ReqUpdateToLuYong
		token:String,
	}
	ReqUpdateToLuYong = 
	{
		id:Number,				//录用对象的id
		luYongTime:String,		//录用时间
		luYongMoney:Number,		//录用薪资
	}
		
	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		userInfo: UserInfo,
	}
	
}

//录用界面部分协议
{
	
	////////////////////////////
	/////*查询录用请求协议*/////
	////////////////////////////
	
	/*
		请求接口：/browseLuYong
	*/
	//协议请求数据
	req =
	{
		data:ReqBrowseLuYong,	//ReqBrowseLuYong
		token:String,
		
		browseIndex:Number,		//查询开始的索引
		browseCount:Number,		//查询条数
		
		sortName:String	,		//排序字段名
		sortType:Number,		//1是升序，-1是降序
		
		isTaoTai: Number,		//是否淘汰，1：是；0：不是
	}
	ReqBrowseLuYong = 
	{
		name:String,			//姓名
		sex:Array, 				//性别 ['男','女']
		education:Array,		//学历 ['小学','初中','高中',……]
		
		yingPinDiDian: Array,	//录用地点 
		department:Array,		//录用部门
		post:Array,				//录用职位
		projectGroup:Array,		//录用项目组
		
		luYongShiJian:Array,	//录用时间 二元数组	
		
		isDaoGang:Array,		//是否到岗
		daoGangShiJian:Array,	//到岗时间 二元数组	
		
		curSalary:Array,		//录用薪资 二元数组	
		luYongTongZhi:Array,	//录用通知
		
		workGroup:Array,		//所属分组（工作组）
		
		bornTime:Array,			//出生时间 二元数组
	}
	
	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		totalCount:Number,		//查询总数
		result:Array,			//查询回包数据结构 ResBrowseLuYong
		userInfo: UserInfo,
	}
	ResBrowseLuYong = 
	{
		id:Number,				//编号
		name:String,			//姓名
		sex:String, 			//性别 ['男','女'] 存数组下标
		bornTime:String,		//出生时间 "yyyy-mm-dd"
		education:String,		//学历 ['小学','初中','高中',……] 存数组下标
		phoneNumber:String,		//联系方式

		yingPinDiDian: String,	//录用地点 存数组下标
		department:String,		//录用部门 ['研发部','行政部','美术部',……] 存数组下标
		post:Array,				//录用职位 ["UI","原画","3D模型", ……] 可多个 存数组下标
		projectGroup:Array,		//录用项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个 存数组下标
		
		isDaoGang:Number,		//是否到岗，1：是；0：不是
		daoGangShiJian:String,	//到岗时间 "yyyy-mm-dd"

		curSalary:Number,		//录用薪资
		luYongTongZhi:String,	//录用通知
		
		workGroup:Array,		//所属组别 ['研发1组','研发2组','研发3组',……]可多个 存数组下标
		
		notes:String,			//备注
		isTaoTai: Number,		//是否淘汰，1：是；0：不是
		updateTime:String,		//数据更新时间 后台的时间戳存储
	}
	
	
	////////////////////////////////
	/////*录用信息编辑请求协议*/////
	////////////////////////////////
	
	/*
		请求接口：/updateLuYongInfo
	*/
	//协议请求数据
	req =
	{
		data:ReqUpdateLuYongInfo,	//ReqUpdateLuYongInfo
		token:String,
	}
	ReqUpdateLuYongInfo = 
	{
		id:Number,				//编号
		name:String,			//姓名
		sex:String, 			//性别 ['男','女'] 存数组下标
		bornTime:String,		//出生时间 "yyyy-mm-dd"
		education:String,		//学历 ['小学','初中','高中',……] 存数组下标
		phoneNumber:String,		//联系方式

		yingPinDiDian: String,	//录用地点 存数组下标
		department:String,		//录用部门 ['研发部','行政部','美术部',……] 存数组下标
		post:Array,				//录用职位 ["UI","原画","3D模型", ……] 可多个 存数组下标
		projectGroup:Array,		//录用项目组别 ['捕鱼','斗地主2d','斗地主3d', ……] 可多个 存数组下标
		
		isDaoGang:Number,		//是否到岗，1：是；0：不是
		daoGangShiJian:String,	//到岗时间 "yyyy-mm-dd"

		curSalary:Number,		//录用薪资
		luYongTongZhi:String,	//录用通知
		
		workGroup:Array,		//所属组别 ['研发1组','研发2组','研发3组',……]可多个 存数组下标
		notes:String,			//备注
	}
	
	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		userInfo: UserInfo,
	}
	
	
	//////////////////////////////////////////////
	/////*录用信息录入到员工信息系统请求协议*/////
	//////////////////////////////////////////////
	
	/*
		请求接口：/addLuYongInfoToEmployee
	*/
	//协议请求数据
	req =
	{
		data:ReqAddToEmployeeInfo,	//ReqAddToEmployeeInfo
		token:String,
	}
	ReqAddToEmployeeInfo = 
	{
		id:Number,				//录用员工信息的对象id
	}
	
	//协议回包数据
	res =
	{
		ret: Number,			//StatusCode
		message: String,		//对结果的描述消息
		userInfo: UserInfo,
	}
	
}









