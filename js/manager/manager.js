var first_select_info = {};
var manager_one_page_count = 1000;
function renderTable()
{
    let body_tr = $(`<tr style="display: table-row; opacity: 1;">
            
            <td class="tr-ind" id="tr-ind"></td>
            <td class="tr-name" id="tr-name"></td>
            <td class="tr-password" id="tr-password"></td>
            <td class="tr-level" id="tr-level"></td>
            <td class="operation">
                <button onClick="onEdit(this)" class="king-btn king-radius king-success">编辑</button>
            </td>
        </tr>`)
                
        $('#tab4_1 .table-tbody').eq(0).html('');
        if(!first_select_info.data || first_select_info.data.length === 0)
        {
            $('#tab4_1 .table-tbody').eq(0).append(`<tr style="display: table-row; opacity: 1;"><td colspan="${body_tr.find('td').length}">没有查到相关信息</td></tr>`);
        }
        else
        {
            first_select_info.data.forEach((v, i) => {
                let clone_tr = body_tr.clone();
                $(clone_tr).find('#tr-ind').text(v.id);
                $(clone_tr).find('#tr-name').text(v.admin);
                $(clone_tr).find('#tr-password').text(v.passwork);
                $(clone_tr).find('#tr-level').text(v.auth);
                $('#tab4_1 .table-tbody').eq(0).append(clone_tr);
            });
        }   
    $('.table-total').eq(0).text(first_select_info.totalCount);
        
}
function onEdit(self)
{
    console.error(self);
    $('#dialog-add-manager').show();
    $('#dialog-add-manager .title').eq(0).text('编辑管理员账号');
    $('#dialog-add-manager').attr('data-type', 'edit');
    $('#dialog-add-manager').attr('data-id', $(self).parent().siblings('#tr-ind').text());
    $('#dialog-add-manager #userName').val($(self).parent().siblings('#tr-name').text());
    $('#dialog-add-manager #password').val($(self).parent().siblings('#tr-password').text());
}
function OnClickAddManager ()
{
    $('#dialog-add-manager').show();
    $('#dialog-add-manager').attr('data-type', 'add');
    $('#dialog-add-manager .title').eq(0).text('新增管理员账号');
}
function OnclickConfirm ()
{
    let user_name = $('#dialog-add-manager #userName').val();
    let password = $('#dialog-add-manager #password').val();
    if(user_name === '')
    {
        alert('用户名不能为空哦！');
        return;
    }
    if(password.length < 6)
    {
        alert('密码最少6位数哦！');
        return;
    }
    if($('#dialog-add-manager').attr('data-type') === 'edit')
    {
        reqEditManager({
            admin: user_name,
            passwork: password,
            auth: "1",
            id: $('#dialog-add-manager').attr('data-id')
        }, function (){
            _reqBaseInfo();
            hideAddDialog();
            alert('成功修改管理员账号！');
        });
    }
    else if($('#dialog-add-manager').attr('data-type') === 'add')
    {
        reqAddManager({
            admin: user_name,
            passwork: password,
            auth: "1",
        }, function (){
            _reqBaseInfo();
            hideAddDialog();
            alert('成功新增管理员账号！');
        });
    }
    
}
function hideAddDialog ()
{
    $('#dialog-add-manager #userName').val('');
    $('#dialog-add-manager #password').val('');
    $('#dialog-add-manager').hide();
}
function _reqBaseInfo ()
{
    reqBaseInfo({
        browseCount: manager_one_page_count
    }, function (){
        renderTable();
    });
}
$(function(){
    _reqBaseInfo();

    $("#add-manager").click(OnClickAddManager);
    $('#dialog-add-manager #confirm').click(OnclickConfirm);
    $('#dialog-add-manager #cancel').click(hideAddDialog);
})

