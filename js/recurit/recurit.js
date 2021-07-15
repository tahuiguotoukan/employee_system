function renderFirstSelectTable()
{
    let body_tr = $(`<tr style="display: table-row; opacity: 1;">
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
$(function(){
    
})