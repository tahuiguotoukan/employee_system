//点击编辑回填数据到详情页
function onClickEdit(self)
{
    let id = parseInt($(self).attr('datas'));
    let person_info = {};
    window.base_data.forEach(function(v, i){
        if(v.id == id)
        {
            person_info = v;
            console.error('个人数据', person_info);
            return false;
        }
    })
    $('#userName').val(person_info.name);
    $('#userCode').val(person_info.id);
    if(person_info.sex == 0)
    {
        $('#sex1').prop('checked', 'true');
        $('#sex2').removeProp('checked');
    }
    else
    {
        $('#sex2').prop('checked', 'true');
        $('#sex1').removeProp('checked');
    }
    $('#address-1').val(person_info.department);
    OnDetailAddress1Change();
    if(person_info.detailedAddress.indexOf('区') > -1){
        $('#address-2').val(person_info.detailedAddress.substr(0, person_info.detailedAddress.indexOf('区')+1));
        $('#address-detail').val(person_info.detailedAddress.substr(person_info.detailedAddress.indexOf('区')+1));
    }
    else
    {
        $('#address-detail').val(person_info.detailedAddress);
    }
    let bornTime = person_info.bornTime.split('T')[0];
    $('#bornTime').val(bornTime).siblings('input').val(bornTime);
    let joinTime = person_info.entryTime.split('T')[0];
    $('#entryTime').val(joinTime).siblings('input').val(joinTime);
    $('#startContractTime').val(person_info.contractTime.split('T')[0]).siblings('input').val(person_info.contractTime.split('T')[0]);
    $('#endContractTime').val(person_info.contractTime2.split('T')[0]).siblings('input').val(person_info.contractTime2.split('T')[0]);
    $('#group').val(person_info.workGroup[0]);
    $('#department').val(person_info.department);
    OnDetailDepartmentChange();
    $('#post').val(person_info.post);
    $('#projectGroup').val(person_info.projectGroup[0]);
    person_info.technologyStack.forEach(function(v, i){
        $($('#skill input')[parseInt(v)]).attr('checked', 'true');
        
    })
    $('#level').val(person_info.employeeProfile);
    setDetailType(detail_type_def.update);
    showEmployeeDetail();
    let year = (new Date()).getFullYear();
    
    person_info.salary.forEach(function(v){
        let change_year = (new Date(v.time)).getFullYear();
        let change_month = (new Date(v.time)).getMonth()+1;
        let tr = $(`<tr id="
            
        " class="">
        <td><span class="tabledit-span tabledit-identifier">${$('#salary-table>tbody>tr').length+1}
            
        </span><input class="tabledit-input tabledit-identifier" type="hidden" name="aid" value="${$('#salary-table>tbody>tr').length+1}
            
        "></td>
        <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">${change_year}</span><select class="tabledit-input  form-control input-sm" name="year" style="display: inline-block;"></select></td>
        <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">${change_month}</span><select class="tabledit-input   form-control input-sm" name="month" style="display: inline-block;"><option value="1">1月</option><option value="2">2月</option><option value="3">3月</option><option value="4">4月</option><option value="5">5月</option><option value="6">6月</option><option value="7">7月</option><option value="8">8月</option><option value="9">9月</option><option value="10">10月</option><option value="11">11月</option><option value="12">12月</option></select></td>
        <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">                                                                                                            </span><input class="tabledit-input    form-control input-sm" type="text" name="money" value="" style="display: inline-block;"></td>
        
    <td style="white-space: nowrap; width: 1%;"><div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
    <div class="btn-group btn-group-sm" style="float: none;"><button type="button" class="tabledit-edit-button btn btn-sm btn-default active" style="float: none;"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="tabledit-delete-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-trash"></span></button></div>
    <button type="button" class="tabledit-save-button btn btn-sm btn-success" style="float: none; display: inline-block;">保存</button>
    <button type="button" class="tabledit-confirm-button btn btn-sm btn-danger" style="display: none; float: none;">确认</button>

    </div></td></tr>`)
        for(let i = year - 20; i <= year; i++)
        {
            tr.find('[name="year"]').append(`<option value="${i}">${i}</option>`);
        }
        let have_year = false;
        for(let i = 0; i < tr.find('[name="year"] option').length; i++)
        {
            let item = tr.find('[name="year"] option')[i];
            if($(item).attr('value') === have_year)
            {
                have_year = true;
                break;
            }
        }
        !have_year && tr.find('[name="year"]').prepend(`<option value="${change_year}">${change_year}</option>`);
        tr.find('[name="month"]').val(change_month);
        tr.find('[name="year"]').val(change_year);
        tr.find('[name="money"]').val(v.money);
        
        $('#salary-table tbody').append(tr);
    })
    
}
function onKeywordSwearch(event)
{
    if(event.keyCode==13)
    {
        reqKeyWordSearch($(event.target).val());
    }
    
}
function onSuperSearch ()
{
    $('#dialog-search').show();
    $('#dialog-more-condition').hide();
    $('#dialog-search>.modal-dialog').css({
        "top": "50%",
        "transform": "translateY(-50%)"
    })
}
function onClickDelete (self)
{
    let id = parseInt($(self).attr('datas'));
    
    if(window.confirm('确定删除该条员工信息么？')){
        reqDeleteEmployee(id, function(){
            $(self).parents('tr').remove();
            alert('删除成功！');
        });
    }
    
}
function onClickLeave (self)
{
    let id = parseInt($(self).attr('datas'));
}
function setDetailType(type)
{
    console.error('set detail type ' + type);
    detail_type = type;
}
function renderPage (page = 1)
{
    cur_page = page;
    $('#total').text(totalEmployCount);
    $('#cur_page').text(cur_page);
    let total_page = Math.floor(totalEmployCount/one_page_count);
    (totalEmployCount%one_page_count > 0 || total_page == 0) && (total_page+=1);
    $('#total_page').text(total_page);
    for(let i = $('#page-list li').length - 2; i > 0; i--)
    {
        $('#page-list li')[i] && $($('#page-list li')[i]).remove(); 
    }
    for(let i = 1; i <= total_page; i++)
    {
        let li = $(`<li><a href="javascript:;" ind="${i-1}">${i}</a></li>`);
        li.click(onClickPage);
        $($('#page-list li')[$('#page-list li').length-2]).after(li);
    }
    $($('#page-list li')[page]).addClass('active').siblings().removeClass('active');
    let pre = $($('#page-list li')[0]);
    let next = $($('#page-list li')[$('#page-list li').length-1]);
    if(total_page === 1)
    {
        pre.addClass('disabled');
        next.addClass('disabled');
    }
    else
    {
        if(page === 1)
        {
            pre.addClass('disabled');
            next.removeClass('disabled');
        }
        else if(page === total_page)
        {
            pre.removeClass('disabled');
            next.addClass('disabled');
        }
        else
        {
            pre.removeClass('disabled');
            next.removeClass('disabled');
        }
    }
}
function onClickPage(evt)
{
    let node = null;
    evt && evt.target && (node = evt.target);
    if(!node || node.parentElement.className.search('active') >= 0)
    {
        console.error('无效点击');
        return;
    }
    else
    {
        let start_index = $(node).attr('ind');
        reqOnJobPagelistInfo(start_index, function(){

        });
    }
}
function renderTable()
{
    

    let head_th = $(`<tr class="active"><th style="width:200px">员工编号</th>
    <th style="min-width:150px">姓名</th>
    <th style="min-width:100px">性别</th>
    <th style="width:200px">所属组别</th>
    <th style="width:200px">所属职位</th>
    <th class="operation" style="width:565px">操作</th></tr>`)
    let body_tr = $(`<tr style="display: table-row; opacity: 1;">
            <td id="id"></td>
            <td id="name"></td>
            <td id="sex"></td>
            <td id="workGroup"></td>
            <td id="post"></td>
            
            <td class="operation">
                <button onClick="onClickEdit(this)" class="king-btn king-default">编辑</button>
                <button onClick="onClickLeave(this)" class="king-btn king-danger">离职</button>
            </td>
        </tr>`)
    for(let k in window.search_params)
    {
        switch(k)
        {
            
            case 'entryTime':
                head_th.find('.operation').before($('<th style="width:200px">入职时间</th>'));
                body_tr.find('.operation').before($('<td id="entryTime"></td>'));
                break;
            case 'technologyStack':
                head_th.find('.operation').before($('<th style="width:200px">技术栈</th>'));
                body_tr.find('.operation').before($('<td id="technologyStack"></td>'));
                break;
            case 'employeeProfile':
                head_th.find('.operation').before($('<th style="width:200px">员工定档</th>'));
                body_tr.find('.operation').before($('<td id="employeeProfile"></td>'));
                break;
            case 'salary':
                head_th.find('.operation').before($('<th style="width:200px">薪资</th>'));
                body_tr.find('.operation').before($('<td id="salary"></td>'));
                break;
            default:
                break;
        }
    }
    $('#employee-table-thead').html(head_th);
    // <td></td>
    $('#employee-table-tbody').html('');
    let td_count = body_tr.find('td').length;
    if(window.base_data.length === 0){
        $('#employee-table-tbody').html(`<tr style="display: table-row; opacity: 1;"><td colspan="${td_count}">没有查到相关信息</td></tr>`);
    }
    $('#foot_td_count').attr('colspan', td_count);
    window.base_data.forEach(function(v, i){
        let clone_tr = body_tr.clone();
        clone_tr.find('#id') && clone_tr.find('#id').text(v.id);
        clone_tr.find('#name') && clone_tr.find('#name').text(v.name);
        clone_tr.find('#sex') && clone_tr.find('#sex').text(v.sex == 1 ? '女' : '男');
        clone_tr.find('#group') && clone_tr.find('#group').text(localConfig.Group[v.workGroup]);
        clone_tr.find('#post') && clone_tr.find('#post').text(localConfig.Post[v.post]);
        clone_tr.find('#entryTime') && clone_tr.find('#entryTime').text(`${v.entryYear}.${v.entryMonth}.${v.entryDay}`);
        let tech = '';
        v.technologyStack.forEach(function (v, i){
            tech+=localConfig.TechnologyStack[i]+';';
        });
        clone_tr.find('#technologyStack') && clone_tr.find('#technologyStack').text(tech);
        clone_tr.find('#employeeProfile') && clone_tr.find('#employeeProfile').text(localConfig.YuanGongDingDang[v.employeeProfile]);
        clone_tr.find('#salary') && clone_tr.find('#salary').text(v.salary[0].money);
        clone_tr.find('.operation button:eq(0)').attr('datas', v.id);
        clone_tr.find('.operation button:eq(1)').attr('datas', v.id);
        $('#employee-table-tbody').append(clone_tr)
    })
}
function OnClickReqOnJobSuperSearch()
{
    var data = {
        'browseIndex': 0,
    };
    $('#dialog-search .form-group').map(function(i, v){
        if($(v).css('display') === 'block')
        {
            switch($(v).attr('type'))
            {
                case 'name':
                    data.name = $(v).find('#name').val();
                    break;
                case 'id':
                    data.id = [$(v).find('#id-start').val()*1, $(v).find('#id-end').val()*1];
                    break;
                case 'sex':
                    data.sex = getValueByName('sex');
                    break;
                case 'entryTime':
                    data.entryTime = [$(v).find('#startEntryTime').val(), $(v).find('#endEntryTime').val()];
                    break;
                case 'bornTime':
                    data.entryTime = [$(v).find('#startBornTime').val(), $(v).find('#endBornTime').val()];
                    break;
                case 'projectGroup':
                    data.projectGroup = getValueByName('projectGroup');
                    break;
                case 'post':
                    data.post = getValueByName('post');
                    break;
                case 'technologyStack':
                    data.technologyStack = getValueByName('technologyStack');
                    break;
                case 'employeeProfile':
                    data.employeeProfile = getValueByName('employeeProfile');
                    break;
                case 'salary':
                    data.salary = [$(v).find('#startSalary').val()*1, $(v).find('#endSalary').val()*1];
                    break;
                case 'contractStatus':
                    data.contractStatus = getValueByName('contractStatus');
                    break;
                case 'workPlace':
                    data.workPlace = getValueByName('workPlace');
                    break;
                case 'changeSalaryNum':
                    data.changeSalaryNum = getValueByName('changeSalaryNum');
                    break;
                case 'department':
                    data.department = getValueByName('department');
                    break;
                case 'workGroup':
                    data.workGroup = getValueByName('workGroup');
                    break;
                default:
                    break;
            }
        }
    })
    console.error('高级查询', data);
    reqOnJobSuperSearch(data,function(){
        $('#dialog-search').hide();
        renderTable();
    });
}
function getValueByName(name)
{
    let d = $('#dialog-search form').serializeArray();
    let r = [];
    for(let i = 0; i < d.length; i++)
    {
        let item = d[i];
        if(name == item.name)
        {
            r.push(parseInt(item.value));
            
        }
    }
    return r;
}
function OnDetailAddress1Change()
{
    let _value =$('#employee-detail #address-1').val();
                $('#employee-detail #address-2').html('');
                if(_value == 0)
                {
                    $('#employee-detail #address-2').html(`<option value="南山区">南山区</option>
                                            <option value="福田区">福田区</option>
                                            <option value="罗湖区">罗湖区</option>
                                            <option value="宝安区">宝安区</option>
                                            <option value="龙岗区">龙岗区</option>
                                            <option value="盐田区">盐田区</option>
                                            <option value="坪山区">坪山区</option>
                                            <option value="龙华区">龙华区</option>
                                            <option value="光明区">光明区</option>
                                            <option value="大鹏新区">大鹏新区</option>
                                            <option value="深汕特别合作区">深汕特别合作区</option>`)
                }
                else if(_value == 1)
                {
                    $('#employee-detail #address-2').html(`<option value="越秀区">越秀区</option>
                                            <option value="荔湾区">荔湾区</option>
                                            <option value="海珠区">海珠区</option>
                                            <option value="天河区">天河区</option>
                                            <option value="白云区">白云区</option>
                                            <option value="黄浦区">黄浦区</option>
                                            <option value="番禺区">番禺区</option>
                                            <option value="花都区">花都区</option>
                                            <option value="南沙区">南沙区</option>
                                            <option value="增城区">增城区</option>
                                            <option value="从化区">从化区</option>`)
                }
                else if(_value == 2)
                {
                    $('#employee-detail #address-2').html(`<option value="渝中区">渝中区</option>
                                            <option value="江北区">江北区</option>
                                            <option value="南岸区">南岸区</option>
                                            <option value="九龙坡区">九龙坡区</option>
                                            <option value="沙坪坝区">沙坪坝区</option>
                                            <option value="大渡口区">大渡口区</option>
                                            <option value="北碚区">北碚区</option>
                                            <option value="渝北区">渝北区</option>
                                            <option value="巴南区">巴南区</option>
                                            `)
                }
}
function OnDetailDepartmentChange()
{
    let v = $('#employee-detail [name="department"]').val();
                let content = $('#employee-detail #post');
                content.html('');
                
                if(v == 0)
                {
                    content.html(`
                        <option value="0">uinty</option>
                        <option value="1">cocos2dx</option>
                        <option value="2">cocos小游戏</option>
                        <option value="3">web前端</option>
                        <option value="4">go后端</option>
                        <option value="5">C++服务器</option>
                    `)
                }
                else if(v == 1)
                {
                    content.html(`
                        <option value="6">游戏UI</option>
                        <option value="7">特效</option>
                        <option value="8">动作</option>
                        <option value="9">3D角色</option>
                        <option value="10">3D场景</option>
                        <option value="11">角色原画</option>
                        <option value="12">场景原画</option>
                    `)
                    
                }
                else if(v == 2)
                {
                    content.html(`
                        <option value="13">策划</option>
                        <option value="14">运营</option>
                    `)
                }
                else if(v == 3)
                {
                    content.html(`
                        <option value="15">人事</option>
                        <option value="16">前台</option>
                        <option value="17">HR</option>
                    `)
                }
}