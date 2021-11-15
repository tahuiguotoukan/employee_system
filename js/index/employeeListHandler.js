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
    $('#employee-detail #userName').val(person_info.name);
    $('#employee-detail #userCode').val(person_info.id);
    if(person_info.sex == 0)
    {
        $('#employee-detail #sex1').prop('checked', 'true');
        $('#employee-detail #sex2').removeProp('checked');
    }
    else
    {
        $('#employee-detail #sex2').prop('checked', 'true');
        $('#employee-detail #sex1').removeProp('checked');
    }
    $('#employee-detail #phoneNumber').val(person_info.phoneNumber);
    $('#employee-detail #education').val(person_info.education);
    $('#employee-detail #address-1').val(person_info.workPlace);
    OnDetailAddress1Change();
    if(person_info.detailedAddress.indexOf('区') > -1){
        $('#employee-detail #address-2').val(person_info.detailedAddress.substr(0, person_info.detailedAddress.indexOf('区')+1));
        $('#employee-detail #address-detail').val(person_info.detailedAddress.substr(person_info.detailedAddress.indexOf('区')+1));
    }
    else
    {
        $('#employee-detail #address-detail').val(person_info.detailedAddress);
    }
    let bornTime = person_info.bornTime.split('T')[0];
    $('#employee-detail #bornTime').val(bornTime).siblings('input').val(bornTime);
    let joinTime = person_info.entryTime.split('T')[0];
    $('#employee-detail #entryTime').val(joinTime).siblings('input').val(joinTime);
    $('#employee-detail #startContractTime').val(person_info.contractTime.split('T')[0]).siblings('input').val(person_info.contractTime.split('T')[0]);
    $('#employee-detail #endContractTime').val(person_info.contractTime2.split('T')[0]).siblings('input').val(person_info.contractTime2.split('T')[0]);
    $('#employee-detail #workGroup').val(person_info.workGroup[0]);
    $('#employee-detail #department').val(person_info.department);
    OnDetailDepartmentChange();
    $('#employee-detail #post').val(person_info.post);
    $('#employee-detail #projectGroup').val(person_info.projectGroup[0]);
    
    $('#employee-detail #level').val(person_info.employeeProfile);
    setDetailType(detail_type_def.update);
    showEmployeeDetail();
    let year = (new Date()).getFullYear();
    
    person_info.salary && person_info.salary.length > 0 && person_info.salary.forEach(function(v){
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
    <button type="button" class="tabledit-save-button btn btn-sm btn-success" style="float: none; display: inline-block;">确认</button>
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
        
        $('#employee-detail #salary-table tbody').append(tr);
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
    $('#dialog-search').attr('search-type', 'onJob');
    showParamsByHistroy('onJob');
    $('#dialog-more-condition').hide();
    $('#dialog-search>.modal-dialog').css({
        "top": "50%",
        "transform": "translateY(-50%)"
    })
    $('#dialog-search form>.form-group[type="offJobTime"]').eq(0).hide();
}
function OnLeaveSuperSearch()
{
    $('#dialog-search').show();
    $('#dialog-search').attr('search-type', 'leaveJob');
    showParamsByHistroy('leaveJob');
    $('#dialog-more-condition').hide();
    $('#dialog-search>.modal-dialog').css({
        "top": "50%",
        "transform": "translateY(-50%)"
    })
    $('#dialog-search form>.form-group[type="bornTime"]').eq(0).hide();
}
function showParamsByHistroy(type)
{
    let active_item = null;
    if(type === 'leaveJob')
    {
        active_item = leave_search_params;
    }
    else if(type === 'onJob')
    { 
        active_item = search_params;
    }
    $('#dialog-search form>.form-group').map((i, v) => {
        $(v).hide();
    });
    $('#dialog-search form>.form-group[type="name"]').eq(0).show();
    for(let k in active_item)
    {
        let item = $('#dialog-search form>.form-group[type="'+k+'"]').eq(0);
        if(item.length > 0) 
        {
            item.show();
        }
    }
    
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
    $('#dialog-leave').show();
    $('#dialog-leave form')[0].reset();
    $('#dialog-leave').attr('usercode', id);

}
function onCloseLeave ()
{
    $('#dialog-leave').hide();
    $('#dialog-leave').attr('usercode', '');
}
function onSureLeave()
{
    reqLeave($('#dialog-leave').attr('usercode'), $('#dialog-leave input[name="leaveTime"]').eq(0).val());
    $('#dialog-leave').hide();
    $('#dialog-leave').attr('usercode', '');
}
function setDetailType(type)
{
    console.error('set detail type ' + type);
    detail_type = type;
}
function renderPage (tab, page = 1)
{
    cur_page = page;
    tab.find('.table-total').eq(0).text(totalEmployCount);
    tab.find('.cur_page').eq(0).text(cur_page);
    let total_page = Math.floor(totalEmployCount/one_page_count);
    (totalEmployCount%one_page_count > 0 || total_page == 0) && (total_page+=1);
    tab.find('.total_page').text(total_page);
    let page_list = tab.find('#page-list').eq(0);
    for(let i = page_list.find('li').length - 2; i > 0; i--)
    {
        page_list.find('li')[i] && $(page_list.find('li')[i]).remove(); 
    }
    for(let i = 1; i <= total_page; i++)
    {
        let li = $(`<li><a href="javascript:;" ind="${i-1}">${i}</a></li>`);
        if(tab.attr('id') === 'tab4_1')
        {
            li.click(onClickOnJobPage);
        }
        else
        {
            li.click(onClickLeavePage);
        }
        $(page_list.find('li')[page_list.find('li').length-2]).after(li);
    }
    $(page_list.find('li')[page]).addClass('active').siblings().removeClass('active');
    let pre = $(page_list.find('li')[0]);
    let next = $(page_list.find('li')[page_list.find('li').length-1]);
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
function onClickOnJobPage(evt)
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
function onClickLeavePage(evt)
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
        
        reqLeavePagelistInfo(start_index, function(){

        });
    }
}
function renderTable(tab)
{

    let body_tr,_search_params;
    if(tab.attr('id') === 'tab4_1')
    {
        _search_params = search_params;
        body_tr = $(`<tr style="display: table-row; opacity: 1;">
            <td class="tr-id"></td>
            <td class="tr-name"></td>
            <td class="tr-sex"></td>
            <td class="tr-phoneNumber"></td>
            <td class="tr-education"></td>
            <td class="tr-workPlace"></td>
            <td class="tr-department"></td>
            <td class="tr-post"></td>
            <td class="tr-workGroup"></td>
            <td class="tr-projectGroup"></td>
            <td class="tr-entryTime"></td>
            <td class="tr-employeeProfile"></td>
            <td class="tr-salary"></td>
            <td class="tr-changeSalaryNum"></td>
            <td class="tr-contractStatus"></td>
            <td class="tr-bornTime"></td>
            <td class="operation">
                <button onClick="onClickEdit(this)" class="king-btn king-radius king-success">编辑</button>
                <button onClick="onClickLeave(this)" class="king-btn king-default">离职</button>
            </td>
        </tr>`)
    }
    else if(tab.attr('id') === 'tab4_2')
    {
        _search_params = leave_search_params;
        body_tr = $(`<tr style="display: table-row; opacity: 1;">
            <td class="tr-id"></td>
            <td class="tr-name"></td>
            <td class="tr-sex"></td>
            <td class="tr-phoneNumber"></td>
            <td class="tr-education"></td>
            <td class="tr-workPlace"></td>
            <td class="tr-department"></td>
            <td class="tr-post"></td>
            <td class="tr-workGroup"></td>
            <td class="tr-projectGroup"></td>
            <td class="tr-entryTime"></td>
            <td class="tr-employeeProfile"></td>
            <td class="tr-salary"></td>
            <td class="tr-changeSalaryNum"></td>
            <td class="tr-contractStatus"></td>
            <td class="tr-offJobTime"></td>
            <td class="operation">
                <button onClick="onClickLeaveComment(this)" class="king-btn king-default">信息备注</button>
                <button onClick="onClickRegain(this)" class="king-btn king-danger">恢复</button>
            </td>
        </tr>`)
    }
    let th_list = tab.find('thead tr th');
    body_tr.find('td').map(function(i,v){
        if(["operation", "tr-id", "tr-name","tr-sex","tr-workPlace","tr-department","tr-post","tr-entryTime"].indexOf($(v).attr('class')) > -1)
        {
            $(th_list[i]).show();
            $(v).show();
        }
        else
        {
            $(th_list[i]).hide();
            $(v).hide();
        }
    })
    for(let k in _search_params)
    {
        let td = body_tr.find('.tr-'+k).eq(0);
        td.show();
        $(th_list[td.index()]).show();
    }
    
    // <td></td>
    tab.find('.employee-table-tbody').eq(0).html('');
    let td_count = body_tr.find('td').length;
    if(window.base_data.length === 0){
        tab.find('.employee-table-tbody').eq(0).html(`<tr style="display: table-row; opacity: 1;"><td colspan="${td_count}">没有查到相关信息</td></tr>`);
    }
    tab.find('.foot_td_count').eq(0).attr('colspan', td_count);
    window.base_data.forEach(function(v, i){
        let clone_tr = body_tr.clone();
        clone_tr.find('.tr-id').eq(0).text(v.id);
        clone_tr.find('.tr-name').eq(0).text(v.name);
        clone_tr.find('.tr-sex').eq(0).text(v.sex == 1 ? '女' : '男');
        clone_tr.find('.tr-phoneNumber').eq(0).text(v.phoneNumber);
        clone_tr.find('.tr-education').eq(0).text(localConfig.education[v.education]);
        clone_tr.find('.tr-workPlace').eq(0).text(localConfig.workPlace[v.workPlace]);
        clone_tr.find('.tr-workGroup').eq(0).text(localConfig.workGroup[v.workGroup]);
        clone_tr.find('.tr-department').eq(0).text(localConfig.department[v.department]);
        clone_tr.find('.tr-projectGroup').eq(0).text(localConfig.projectGroup[v.projectGroup]);
        clone_tr.find('.tr-post').eq(0).text(GetPositionNameByVal(v.post[0]));
        
        
        clone_tr.find('.tr-entryTime').eq(0).text(v.entryTime.split('T')[0]);
        clone_tr.find('.tr-employeeProfile').eq(0).text(localConfig.employeeProfile[v.employeeProfile]);
        clone_tr.find('.tr-salary').eq(0).text(v.salary&&v.salary.length>0 ? v.salary[v.salary.length-1].money : '暂无');
        clone_tr.find('.tr-changeSalaryNum').eq(0).text(v.changeSalaryNum);
        clone_tr.find('.tr-contractStatus').eq(0).text(localConfig.contractStatus[v.contractStatus]);
        clone_tr.find('.tr-bornTime').eq(0).text(v.bornTime.split('T')[0]);
        clone_tr.find('.tr-offJobTime').eq(0).text(v.offJobTime.split('T')[0]);
        clone_tr.find('.operation button:eq(0)').attr('datas', v.id);
        clone_tr.find('.operation button:eq(1)').attr('datas', v.id);
        
        if(v.contractStatus == 0)
        {
            clone_tr.css('color', '#333333');
        }
        else if(v.contractStatus == 1) //已过期
        {
            clone_tr.css('color', '#d9001b');
            let end_time = new Date(v.contractTime2);
            let now_time = Date.now();
            let diff = Math.floor((now_time-end_time.getTime())/(1000*60*60*24));
            if(tab.attr('id') === 'tab4_1')
            {
                clone_tr.find('.tr-contractStatus').eq(0).text(`已过期${diff}天`);
            }
            else if(tab.attr('id') === 'tab4_2')
            {
                clone_tr.find('.tr-contractStatus').eq(0).text(`已过期`);
            }
        }
        else if(v.contractStatus == 2)
        {
            clone_tr.css('color', '#95f204');
        }
        else if(v.contractStatus == 3)
        {
            clone_tr.css('color', '#ff5105');
        }
        tab.find('.employee-table-tbody').eq(0).append(clone_tr)
    })
    let comment = '';
    for(let i in members)
    {
        comment+=`${localConfig.workPlace[i]}${members[i]}人、`
    }
    comment = comment.substr(0, comment.length-1);
    if(tab.attr('id') === 'tab4_1')
    {
        tab.find('.foot_td_count .comment').eq(0).text(`在职${window.totalEmployCount} (${comment})`);
    }
    else if(tab.attr('id') === 'tab4_2')
    {
        tab.find('.foot_td_count .comment').eq(0).text(`离职${window.totalEmployCount} (${comment})`);
    }
    
}
function OnClickReqSuperSearch()
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
                    data.bornTime = [$(v).find('#startBornTime').val(), $(v).find('#endBornTime').val()];
                    break;
                case 'offJobTime':
                    data.offJobTime = [$(v).find('#startoffJobTime').val(), $(v).find('#endoffJobTime').val()];
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
                case 'phoneNumber':
                    data.phoneNumber = $(v).find('#phoneNumber').val();
                    break;
                case 'education':
                    data.education = getValueByName('education');
                    break;
                default:
                    break;
            }
        }
    })
    console.error('高级查询', data);
    let search_type = $('#dialog-search').attr('search-type');
    if(search_type === 'leaveJob')
    {
        reqLeaveSuperSearch(data,function(){
            $('#dialog-search').hide();
            renderTable($('#tab4_2'));
        });
    }
    else if(search_type === 'onJob')
    {
        reqOnJobSuperSearch(data,function(){
            $('#dialog-search').hide();
            renderTable($('#tab4_1'));
        });
    }
    
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
    let department_cfg = localConfig.department;
    let v = $('#employee-detail [name="department"]').val();
    let content = $('#employee-detail #post');
    content.html('');
    if(!department_cfg[v]) return;
    let _pos_cfg = department_cfg[v].position;
    
    _pos_cfg.forEach((v, i) => {
        content.append(`<option value="${v.val}">${v.name}</option>`);
    })
                
}
function ShowEmployeeTable()
{
    $('#tab4_1').show().siblings().hide();
    // $(this).css('color', '#44b549').siblings().css('color', '#645F63');
    reqOnJoblistInfo(search_params.browseIndex, search_params);
}
function ShowLeaveTable()
{
    $('#tab4_2').show().siblings().hide();
    // $(this).css('color', '#44b549').siblings().css('color', '#645F63');
    reqLeaveJoblistInfo(leave_search_params.browseIndex, leave_search_params);
}
function onClickRegain (self)
{
    let id = parseInt($(self).attr('datas'));
    let is_regain = window.confirm('确定恢复该员工为在职状态么？');
    is_regain && reqRegain(id);
}
function onClickLeaveComment (self)
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
    if(person_info && person_info.offJobInfoNotes != '')
    {
        $('#leave-comment-textarea').val(person_info.offJobInfoNotes);
    }
    else
    {
        $('#leave-comment-textarea').val('');
    }
    $('#dialog-leave-comment').show().attr('userCode', id);
}
function onCloseLeaveComment()
{
    $('#dialog-leave-comment').hide().attr('userCode', '');
}
function onSureLeaveComment()
{
    reqUpdateLeaveComment($('#dialog-leave-comment').attr('userCode'), $('#leave-comment-textarea').val());
    $('#dialog-leave-comment').hide().attr('userCode', '');
}