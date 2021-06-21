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
        $('#sex1').attr('checked', 'true');
        $('#sex2').removeAttr('checked');
    }
    else
    {
        $('#sex2').attr('checked', 'true');
        $('#sex1').removeAttr('checked');
    }
    let bornTime = `${person_info.bornYear}-${person_info.bornMonth}-${person_info.bornDay}`;
    $('#bornTime').val(bornTime).siblings('input').val(bornTime);
    let joinTime = `${person_info.entryYear}-${person_info.entryMonth}-${person_info.entryDay}`;
    $('#entryTime').val(bornTime).siblings('input').val(bornTime);
    $('#group').val(person_info.group);
    $('#position').val(person_info.post);
    person_info.technologyStack.forEach(function(v, i){
        $($('#skill input')[parseInt(v)]).attr('checked', 'true');
        
    })
    $('#level').val(person_info.employeeProfile);
    setDetailType(detail_type_def.update);
    showEmployeeDetail();
    person_info.salary.forEach(function(v){
        let tr = $(`<tr id="
            
        " class="">
        <td><span class="tabledit-span tabledit-identifier">${$('#salary-table>tbody>tr').length+1}
            
        </span><input class="tabledit-input tabledit-identifier" type="hidden" name="aid" value="${$('#salary-table>tbody>tr').length+1}
            
        "></td>
        <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">${v.year}</span><select class="tabledit-input  form-control input-sm" name="year" style="display: inline-block;"><option value="2001">2001年</option><option value="2002">2002年</option><option value="2003">2003年</option><option value="2004">2004年</option><option value="2005">2005年</option><option value="2006">2006年</option><option value="2007">2007年</option><option value="2008">2008年</option><option value="2009">2009年</option><option value="2010">2010年</option><option value="2011">2011年</option><option value="2012">2012年</option><option value="2013">2013年</option><option value="2014">2014年</option><option value="2015">2015年</option><option value="2016">2016年</option><option value="2017">2017年</option><option value="2018">2018年</option><option value="2019">2019年</option><option value="2020">2020年</option><option value="2021">2021年</option></select></td>
        <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">${v.month}</span><select class="tabledit-input   form-control input-sm" name="month" style="display: inline-block;"><option value="1">1月</option><option value="2">2月</option><option value="3">3月</option><option value="4">4月</option><option value="5">5月</option><option value="6">6月</option><option value="7">7月</option><option value="8">8月</option><option value="9">9月</option><option value="10">10月</option><option value="11">11月</option><option value="12">12月</option></select></td>
        <td class="tabledit-edit-mode"><span class="tabledit-span" style="display: none;">                                                                                                            </span><input class="tabledit-input    form-control input-sm" type="text" name="money" value="" style="display: inline-block;"></td>
        
    <td style="white-space: nowrap; width: 1%;"><div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
    <div class="btn-group btn-group-sm" style="float: none;"><button type="button" class="tabledit-edit-button btn btn-sm btn-default active" style="float: none;"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="tabledit-delete-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-trash"></span></button></div>
    <button type="button" class="tabledit-save-button btn btn-sm btn-success" style="float: none; display: inline-block;">保存</button>
    <button type="button" class="tabledit-confirm-button btn btn-sm btn-danger" style="display: none; float: none;">确认</button>

    </div></td></tr>`)
        tr.find('[name="month"]').val(v.month);
        tr.find('[name="year"]').val(v.year);
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
            <td id="group"></td>
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
        clone_tr.find('#group') && clone_tr.find('#group').text(localConfig.Group[v.group]);
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