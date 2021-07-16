var first_select_info = [];
function renderFirstSelectTable()
{
    let body_tr = $(`<tr style="display: table-row; opacity: 1;">
            
            <td class="tr-name"></td>
            <td class="tr-sex"></td>
            <td class="tr-bornTime"></td>
            <td class="tr-education"></td>
            <td class="tr-phoneNumber"></td>
            <td class="tr-yingPinDiDian"></td>
            <td class="tr-department"></td>
            <td class="tr-post"></td>
            <td class="tr-projectGroup"></td>
            <td class="tr-fuZeRen"></td>
            <td class="tr-luRuShiJian"></td>
            <td class="tr-daoRuJianLi"></td>
            <td class="tr-zhaoPinJinCheng"></td>
            <td class="tr-notes"></td>
            <td class="operation">
                <button onClick="onEdit(this)" class="king-btn king-radius king-success">编辑</button>
                <button onClick="onConvertInterview(this)" class="king-btn king-danger">转面试</button>
                <button onClick="onPass(this)" class="king-btn king-default">淘汰/流失</button>
            </td>
        </tr>`)
                
        $('#tab4_1 .table-tbody').eq(0).html('');
        first_select_info.forEach((v, i) => {
            let clone_tr = body_tr.clone();
            $('#tab4_1 .table-tbody').eq(0).append(clone_tr);
        });
        
}
function onEdit(self)
{
    console.error(self);
}
function onConvertInterview (self)
{

}
function onPass (self)
{

}
$(function(){
    reqFirstSelectInfo({}, function (){
        renderFirstSelectTable();
    });
})