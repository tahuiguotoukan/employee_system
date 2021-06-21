const right_table = $(`
<div  id="employee-list" class="tab-box">
    <ul class="nav nav-tabs king-nav-tabs2 king-tab-success">
        <li class="active">
            <a href="#tab4_1" data-toggle="tab">在职人员</a>
        </li>
        <li>
            <a href="#tab4_2" data-toggle="tab">离职人员</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade in active" id="tab4_1">
            <div class="panel panel-default table7_demo king-table7-demo3">
                <div class="panel-body">
                    <div class="king-wrapper clearfix">
                        <a class="pull-left">&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        <a id="add-employee" href="javascript:void(0);" class="king-btn king-btn-new pull-right">
                                新增员工
                            </a>
                            <a id="super-search" href="javascript:void(0);" class="king-btn king-danger pull-left">
                                高级查询
                            </a>
                    </div>
                </div>
                <div>
                    <table class="table table-hover mb0">
                        <thead id="employee-table-thead">
                                <th style="min-width:100px">员工工号</th>
                                <th style="min-width:100px">员工姓名</th>
                                <th style="min-width:100px">性别</th>
                                <th style="min-width:100px">上班地点</th>
                                <th style="min-width:100px">所属部门</th>
                                <th style="min-width:100px">职位</th>
                                <th style="min-width:100px">所属组别</th>
                                <th style="min-width:100px">所属项目组</th>
                                <th style="min-width:100px">入职时间</th>
                                <th style="min-width:100px">定档</th>
                                <th style="min-width:100px">当前薪资</th>
                                <th style="min-width:100px">调薪次数</th>
                                <th style="min-width:100px">签约状态</th>
                                <th style="min-width:100px">出生日期</th>
                                <th class="operation" style="width:565px">操作</th>
                            </tr>
                        </thead>
                        <tbody id="employee-table-tbody">
                        </tbody>
                        <tfoot>
                            <tr>
                                <td id="foot_td_count" colspan="7">
                                    <div class="comment pull-left" style="line-height:45px"></div>
                                    <div class="pull-right king-page-box">
                                        <p class="pull-left mt15 mr15">
                                            共<span id="total">25</span>条记录，当前第<span id="cur_page">1</span>/<span id="total_page">5</span>页
                                        </p>
                                        <ul id="page-list" class="pagination pagination-sm pull-left mt10">
                                            <li>
                                                <a href="javascript:;" aria-label="Previous" id="prev">
                                                    <span aria-hidden="true">«</span>
                                                </a>
                                            </li>
                                            <li><a href="javascript:;">1</a></li>
                                            <li>
                                                <a href="javascript:;" aria-label="Next" id="next">
                                                    <span aria-hidden="true">»</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade in active" id="tab4_2"></div>
    </div>
</div>

`)