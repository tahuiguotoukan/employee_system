function addEmployeeSalary(){
    let year = (new Date()).getFullYear();
    let tr = $(`<tr id="
            
    " class="">
    <td><span class="tabledit-span tabledit-identifier">${$('#salary-table>tbody>tr').length+1}
        
    </span><input class="tabledit-input tabledit-identifier" type="hidden" name="aid" value="${$('#salary-table>tbody>tr').length+1}
        
    "></td>
    <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">${year}</span><select class="tabledit-input  form-control input-sm" name="year" style="display: inline-block;"></select></td>
    <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">1月</span><select class="tabledit-input   form-control input-sm" name="month" style="display: inline-block;"><option value="1">1月</option><option value="2">2月</option><option value="3">3月</option><option value="4">4月</option><option value="5">5月</option><option value="6">6月</option><option value="7">7月</option><option value="8">8月</option><option value="9">9月</option><option value="10">10月</option><option value="11">11月</option><option value="12">12月</option></select></td>
    <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">                                                                                                            </span><input class="tabledit-input    form-control input-sm" type="text" name="money" value="" style="display: inline-block;"></td>
    
<td style="white-space: nowrap; width: 1%;"><div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
<div class="btn-group btn-group-sm" style="float: none;"><button type="button" class="tabledit-edit-button btn btn-sm btn-default active" style="float: none;"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="tabledit-delete-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-trash"></span></button></div>
<button type="button" class="tabledit-save-button btn btn-sm btn-success" style="float: none; display: inline-block;">确认</button>
<button type="button" class="tabledit-confirm-button btn btn-sm btn-danger" style="display: none; float: none;">确认</button>

</div></td></tr>`);
    for(let i = year - 20; i <= year; i++)
    {
        tr.find('[name="year"]').append(`<option value="${i}">${i}</option>`);
    }
    
    $('#salary-table tbody').append(tr)
    
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
        bornTime: '',           //出生年月日
        entryTime:0,			//员工入职年月日
        salary:[], 	//员工薪资信息
        workGroup:0, 				//员工所属组别
        post:0,					//员工职位	值代表Post的索引
        employeeProfile:"",		//员工定档
        contractTime: '',  //合同时间
        contractTime2: '',          //合同结束时间
        department: null,        //所属部门
        projectGroup:  null,        //项目组
        detailedAddress: '',    //详细地址
        workPlace: 0,       //工作城市
        jobStatus: 1,          //在职状态 1:在职， 0:离职
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
            case 'address-1':
                data.workPlace = parseInt(v.value);
                break;
            case 'address-2':
                data.detailedAddress = v.value+$('#address-detail').val();
                break;
            case 'startContractTime':
                data.contractTime = v.value;
                break;
            case 'endContractTime':
                data.contractTime2 = v.value;
                break;
            case 'bornTime':
                data.bornTime = v.value;
                break;
            case 'entryTime':
                data.entryTime = v.value;
                break;
            case 'department':
                data.department = v.value;
                break;
            case 'workGroup':
                data.workGroup = parseInt(v.value);
                break;
            case 'post':
                data.post = parseInt(v.value);
                break;
            case 'projectGroup':
                data.projectGroup = v.value;
                break;
            case 'level':
                data.employeeProfile = parseInt(v.value);
                break;
            case 'phoneNumber':
                data.phoneNumber = v.value;
                break;
            case 'education':
                data.education = parseInt(v.value);
                break;
            default:
                break;
        }
    })
    $('#salary-table>tbody tr').map(function(i, v){
        data.salary.push({
            money: parseInt($(v).find('[name="money"]').val()),
            time: parseInt($(v).find('[name="year"]').val())+'-'+parseInt($(v).find('[name="month"]').val())+'-'+'1'
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
function OnSumoselectDemo8Change ()
{
    let sumoselect_demo8_select = $('#sumoselect_demo8 select.selectall');
    let len = $('#sumoselect_demo9 select').children('option').length;
    for(let i = len - 1; i >= 0; i--)
    {
        $('#sumoselect_demo9 select')[0].sumo.remove(i);
    }
    let len10 = $('#sumoselect_demo10 select').children('option').length;
    for(let i = len10 - 1; i >= 0; i--)
    {
        $('#sumoselect_demo10 select')[0].sumo.remove(i);
    }
    let department_cfg = localConfig.department;
    let _value = sumoselect_demo8_select.val(); 
    //可以多选
    if(_value == null || sumoselect_demo8_select.parents('.form-group').css('display') === 'none'){
        _value = [];
        department_cfg.forEach((v, i) => {
            _value.push(v.val);
        })
    };
    _value.forEach(function(v, i){
        let _pos_cfg = GetDepartmentInfoByVal(v);
        if(!_pos_cfg) return;
        _pos_cfg.position.forEach((v, i) => {
            $('#sumoselect_demo9 select')[0].sumo.add(v.val,v.name);
        })
        _pos_cfg.workGroup.forEach((v, i) => {
            $('#sumoselect_demo10 select')[0].sumo.add(v.val,v.name);
        })
    })
}