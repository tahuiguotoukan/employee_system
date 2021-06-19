function addEmployeeSalary(){
    let year = (new Date()).getFullYear();
    $('#salary-table>tbody').append(`<tr id="
            
            " class="">
            <td><span class="tabledit-span tabledit-identifier">${$('#salary-table>tbody>tr').length+1}
                
            </span><input class="tabledit-input tabledit-identifier" type="hidden" name="aid" value="${$('#salary-table>tbody>tr').length+1}
                
            "></td>
            <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">${year}</span><select class="tabledit-input  form-control input-sm" name="year" style="display: inline-block;"><option value="2001">2001年</option><option value="2002">2002年</option><option value="2003">2003年</option><option value="2004">2004年</option><option value="2005">2005年</option><option value="2006">2006年</option><option value="2007">2007年</option><option value="2008">2008年</option><option value="2009">2009年</option><option value="2010">2010年</option><option value="2011">2011年</option><option value="2012">2012年</option><option value="2013">2013年</option><option value="2014">2014年</option><option value="2015">2015年</option><option value="2016">2016年</option><option value="2017">2017年</option><option value="2018">2018年</option><option value="2019">2019年</option><option value="2020">2020年</option><option value="2021">2021年</option></select></td>
            <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">1月</span><select class="tabledit-input   form-control input-sm" name="month" style="display: inline-block;"><option value="1">1月</option><option value="2">2月</option><option value="3">3月</option><option value="4">4月</option><option value="5">5月</option><option value="6">6月</option><option value="7">7月</option><option value="8">8月</option><option value="9">9月</option><option value="10">10月</option><option value="11">11月</option><option value="12">12月</option></select></td>
            <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">                                                                                                            </span><input class="tabledit-input    form-control input-sm" type="text" name="money" value="" style="display: inline-block;"></td>
            
        <td style="white-space: nowrap; width: 1%;"><div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
        <div class="btn-group btn-group-sm" style="float: none;"><button type="button" class="tabledit-edit-button btn btn-sm btn-default active" style="float: none;"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="tabledit-delete-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-trash"></span></button></div>
        <button type="button" class="tabledit-save-button btn btn-sm btn-success" style="float: none; display: inline-block;">保存</button>
        <button type="button" class="tabledit-confirm-button btn btn-sm btn-danger" style="display: none; float: none;">确认</button>
        
    </div></td></tr>`)
    $('#salary-table>tbody').find('[name="year"]>option').map(function(i, v){
        console.log(typeof v.value);
        if(parseInt(v.value) === year)
        {
            $(v).attr("selected", "selected");
            return;
        }
    })
}
function RenderLocalConfig()
{
    if($('#level').length == 0 || $('#skill').length == 0 || $('#position') == 0) return;
    $('#level').html('');
    $('#skill').html('');
    $('#position').html('');
    localConfig.Post && localConfig.Post.length > 0 && localConfig.Post.forEach((v, i) => {
        $('#position').append(`
            <option value="${i}">${v}</option>
        `)
    });
    localConfig.TechnologyStack && localConfig.TechnologyStack.length > 0 && localConfig.TechnologyStack.forEach(function(v, i){
        $('#skill').append(`
            <label class="mr10"> 
                <input type="checkbox" name="skill"  value="${i}">${v}
            </label>
        `)
    })
    localConfig.YuanGongDingDang && localConfig.YuanGongDingDang.length > 0 && localConfig.YuanGongDingDang.forEach(function(v, i){
        $('#level').append(`
            <option value="${i}">${v}</option>
        `)
    })
}
function onClickSubmitEmployeeDetail()
{
    var data = {
        id:0,					//员工编号
        name: "",				//员工姓名
        sex:0, 					//员工性别 0:男，1：女
        bornYear: 0,			//员工出生年份
        bornMonth:0,			//员工出生月份
        bornDay: 0,
        entryYear:0,			//员工入职年份
        entryMonth:0, 			//员工入职月份
        entryDay:0, 			//员工入职日份
        salary:[], 	//员工薪资信息
        group:0, 				//员工所属组别
        post:0,					//员工职位	值代表Post的索引
        technologyStack:[], 	//员工所属技术栈	从TechnologyStack这里取值
        employeeProfile:"",		//员工定档
    }
    let post_data = $('#detail-form').serializeArray();
    post_data.forEach(function(v, i){
        switch(v.name)
        {
            case 'userName':
                data.name = v.value;
                break;
            case 'sex':
                data.sex = parseInt(v.value);
                break;
            case 'bornTime':
                let _date_born = new Date(v.value);
                data.bornYear = _date_born.getFullYear();
                data.bornMonth = _date_born.getMonth()+1;
                data.bornDay = _date_born.getDate();
                break;
            case 'entryTime':
                let _date_entry = new Date(v.value);
                data.entryYear = _date_entry.getFullYear();
                data.entryMonth = _date_entry.getMonth()+1;
                data.entryDay = _date_entry.getDate();
                break;
            case 'group':
                data.group = parseInt(v.value);
                break;
            case 'position':
                data.post = parseInt(v.value);
                break;
            case 'skill':
                data.technologyStack.push(parseInt(v.value));
                break;
            case 'level':
                data.employeeProfile = parseInt(v.value);
                break;
            default:
                break;
        }
    })
    $('#salary-table>tbody tr').map(function(i, v){
        data.salary.push({
            month: parseInt($(v).find('[name="month"]').val()),
            year: parseInt($(v).find('[name="year"]').val()),
            money: parseInt($(v).find('[name="money"]').val())
        })
    })
    data.id = $('#userCode').val() === '' ? 0 : parseInt($('#userCode').val());
    console.error('保存信息', data);
    if(detail_type === detail_type_def.update)
    {
        reqUpdateEmployeeInfo(data);
    }
    else
    {
        reqSaveEmployeeInfo(data);
    }
}