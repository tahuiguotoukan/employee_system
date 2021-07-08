var base_data = null;
        var totalEmployCount = 0;
        var members = null;
        var search_params = {};
        var leave_search_params = {};
        const detail_type_def = {
            add: 0,
            update: 1
        };
        //初始化详细面板类型
        var detail_type = detail_type_def.add;
        var cur_page = 1;
        var one_page_count = 12;
        $(function () {
            
            $('#right').append(right_table);
            
            $('#plugin9_demo2').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo3').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo4').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo5').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo6').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo7').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo8').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo9').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo10').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo11').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            $('#plugin9_demo12').datetimepicker({
                language:  'zh-TW',
                weekStart: 1,
                todayBtn:  true,
                autoclose: true,
                todayHighlight: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                format:"yyyy-mm-dd",
            });
            //vertical_nav11_js_start
            $('#menu').metisMenu(); 
            //vertical_nav11_js_end_js_end
            $('#sumoselect_demo4 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择状态',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo5 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择地址',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo6 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择挡位',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo7 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择次数',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo8 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择部门',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo8 select.selectall').change(OnSumoselectDemo8Change)
            $('#sumoselect_demo9 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择职位',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo10 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择研发组',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo11 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择项目组',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo12 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择性别',
                selectAlltext: '全选'
            });
            $('#sumoselect_demo13 select').SumoSelect({
                okCancelInMulti: true,
                selectAll: true,
                placeholder: '选择学历',
                selectAlltext: '全选'
            });
            $('#employee-detail [name="department"]').change(function(){
                OnDetailDepartmentChange();
            })
            $('#address-1').change(function(){
                OnDetailAddress1Change();
            })
            let _year = (new Date()).getFullYear();
            let year_obj = '';
            for(let i = _year-20; i <= _year; i++)
            {
                if(i === _year-20) year_obj+='{';
                if(i < _year) year_obj+=`"${i}":"${i}年",`;
                if(i === _year) year_obj+=`"${i}":"${i}年"}`;;
            }
            let month = '';
            for(let i = 1; i <= 12; i++)
            {
                if(i === 1) month+='{';
                if(i < 12) month+=`"${i}":"${i}月",`;
                
                if(i === 12) month+=`"${i}":"${i}月"}`;
            }
            $('#salary-table').Tabledit({
                url: "./demo.json",
                rowKey: 'a_',
                columns: {
                    identifier: [0, 'aid'],
                    editable: [
                    [1, 'year', year_obj], [2, 'month', month], [3, 'salary']
                    ]
                },
                restoreButton: false,
                buttons: {
                    edit: {
                        class: 'btn btn-sm btn-default',
                        html: '<span class="glyphicon glyphicon-pencil"></span>',
                        action: 'edit'
                    },
                    delete: {
                        class: 'btn btn-sm btn-default',
                        html: '<span class="glyphicon glyphicon-trash"></span>',
                        action: 'delete'
                    },
                    save: {
                        class: 'btn btn-sm btn-success',
                        html: '确认'
                    },
                    confirm: {
                        class: 'btn btn-sm btn-danger',
                        html: '确认'
                    }
                },
                onSuccess: function (data, textStatus, jqXHR){
                    console.log('success');
                },
                onFail: function (jqXHR, textStatus, errorThrown){
                    console.log('fail');
                }
            });
            $('#add-new-salary').click(function(){
                addEmployeeSalary();
            })

            //default show panel start
            reqLocalCfg(function(){
                showEmployeeList();
            });
            
            
            //default show panel end
            

            //add employee btn click start
            $('#add-employee').click(function(){
                setDetailType(detail_type_def.add);
                showEmployeeDetail();
                OnDetailAddress1Change();
                OnDetailDepartmentChange();
            })
            //add employee btn click end

            //left add employee btn click start
            $('#btn_employee-detail').click(function(){
                initEmployeeForm();
            })
            //left add employee btn click end

            $('#submit-employee-detail').click(onClickSubmitEmployeeDetail);
            $('#cancel-employee-detail').click(() => {
                //只是展示表格，不做数据刷新处理
                $('#right').children().map((i, v) => {
                    $(v).attr('id') === 'employee-list' ? $(v).show() : $(v).hide();
                })
                initEmployeeForm();
            })
            $('#keyword-search').bind('keyup', onKeywordSwearch);
            
            $('#close-super-search').click(function(){
                $('#dialog-search').hide();
            })
            
            $('#close-more-condition').click(function() {
                $('#dialog-more-condition').hide();
            })
            $('#dialog-search form>.form-group').hover(function(){
                $(this).find('.close-item').show();
            }, function(){
                $(this).find('.close-item').hide();
            })
            $('#dialog-search .close-item').click(function(){
                $(this).parents('.form-group').hide();
                if($(this).parents('.form-group').attr('type') === 'department')
                {
                    OnSumoselectDemo8Change();
                }
            })
            $('#more-condition').click(function(){
                $('#dialog-more-condition').show();
                $('#condition-list').html('');
                $('#dialog-more-condition').css('right', ($('#dialog-search .modal-content').width()-$('#dialog-more-condition').width())+'px');
                $('#dialog-search form>.form-group').map(function(i, v){
                    let _li = $(`<li class="col-sm-6">
                          <label><input tabindex="${i}" class="" type="checkbox"> ${$(v).children('label').text().replace(/[:：]/g, '')}</label>
                        </li>`)
                    if($(v).css('display') === 'block')
                    {
                        _li.find('input').prop('checked', true);
                    }
                    else
                    {
                        _li.find('input').removeProp('checked');
                    }
                    
                    $('#condition-list').append(_li);
                })
                if($('#dialog-search').attr('search-type') === 'onJob')
                {
                    $('#condition-list>li').eq($('#dialog-search form>.form-group[type="bornTime"]').eq(0).index()).show();
                    $('#condition-list>li').eq($('#dialog-search form>.form-group[type="offJobTime"]').eq(0).index()).hide();
                }
                else if($('#dialog-search').attr('search-type') === 'leaveJob')
                {
                    $('#condition-list>li').eq($('#dialog-search form>.form-group[type="bornTime"]').eq(0).index()).hide();
                    $('#condition-list>li').eq($('#dialog-search form>.form-group[type="offJobTime"]').eq(0).index()).show();
                }
                $('#all-select').attr('all', 0);
            })
            $('#add-condition').click(function(){
                $('#condition-list li').map(function(i,v){
                    console.error(typeof $(v).find('input').prop('checked'))
                    if($(v).find('input').prop('checked') === true)
                    {
                        $($('#dialog-search form>.form-group')[i]).css('display', 'block');
                    }
                    else
                    {
                        $($('#dialog-search form>.form-group')[i]).css('display', 'none');
                    }
                    if($($('#dialog-search form>.form-group')[i]).attr('type') === 'department')
                    {
                        OnSumoselectDemo8Change();
                    }
                })
                $('#dialog-more-condition').hide();
            })
            
            $('#condition-list li input').click(function(){
                $(this).prop('checked') === true ? $(this).removeProp('checked') : $(this).prop('checked', true);
            })
            $('#all-select').click(function(){
                if($(this).attr('all') == 1)
                {
                    $(this).attr('all', 0);
                }
                else
                {
                    $(this).attr('all', 1);
                }
                let self = this;
                $('#condition-list li input').map(function(i, v){
                    $(self).attr('all') == 1 ? $(v).prop('checked', true) : $(v).removeProp('checked');
                });
                
            })
            $('#req-super-search').click(function(){
                OnClickReqSuperSearch();
            })

            $('#tab4_1 .prev').eq(0).click(function(evt){
                if(this.parentElement.className === "disabled") return;
                let start_index = $('#tab4_1 .cur_page').eq(0).text()-2;
                reqOnJobPagelistInfo(start_index, function(){

                });
            })
            $('#tab4_1 .next').eq(0).click(function(evt){
                if(this.parentElement.className === "disabled") return;
                let start_index = $('#tab4_1 .cur_page').eq(0).text()*1;
                reqOnJobPagelistInfo(start_index, function(){

                });
            })
            $('#tab4_2 .prev').eq(0).click(function(evt){
                if(this.parentElement.className === "disabled") return;
                let start_index = $('#tab4_2 .cur_page').eq(0).text()-2;
                reqLeavePagelistInfo(start_index, function(){

                });
            })
            $('#tab4_2 .next').eq(0).click(function(evt){
                if(this.parentElement.className === "disabled") return;
                let start_index = $('#tab4_2 .cur_page').eq(0).text()*1;
                reqLeavePagelistInfo(start_index, function(){

                });
            })
            $('#employee-list a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            })
            $('#reset-condition').click(function(){
                $('#dialog-search form')[0].reset();
                $('#sumoselect_demo4 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo5 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo6 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo7 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo8 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo9 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo10 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo11 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo12 select')[0].sumo.unSelectAll();
                $('#sumoselect_demo13 select')[0].sumo.unSelectAll();
                // $('#dialog-search form>.form-group').map(function(i, v){
                //     if(i > 0) $(v).css('display', 'none');
                // });
                alert('已重置');
            })
            $('.table-sort').click(function(){
                $(this).siblings().children('.table-sort i').attr('class', 'fa fa-sort');
                // 'fa fa-sort-asc','fa fa-sort-desc'
                if($(this).children('i').attr('class') === 'fa fa-sort-asc')//改升序
                {
                    $(this).children('i').attr('class', 'fa fa-sort-desc');
                    reqAscSortInfo($(this).parents('.tab-pane'), $(this).attr('datas-id'));
                }
                else if($(this).children('i').attr('class') === 'fa fa-sort-desc')//去掉排序
                {
                    $(this).children('i').attr('class', 'fa fa-sort');
                    reqNotSortInfo($(this).parents('.tab-pane'), $(this).attr('datas-id'));
                }
                else//改降序
                {
                    $(this).children('i').attr('class', 'fa fa-sort-asc');
                    reqDescSortInfo($(this).parents('.tab-pane'), $(this).attr('datas-id'));
                }
            })
            $('.table-sort').hover(function (){
                $(this).css('background-color', '#ddd');
            }, function (){
                $(this).css('background-color', '#eee');
            })
        });
        
        var initEmployeeForm = function(){
            $('#detail-form')[0].reset();
            $('#skill input').map(function(i, v){
                $(v).removeProp('checked');
            })
            $('#salary-table tbody').empty();
        };
        

        

        var showEmployeeList = function (isSort=false, key='')
        {
            $('#right').children().map((i, v) => {
                $(v).attr('id') === 'employee-list' ? $(v).show() : $(v).hide();
            })
            if(isSort)
            {
                reqDescSortInfo($('#tab4_1'), key);
            }
            else
            {
                reqOnJoblistInfo(0);
            }
            
        }

        var showEmployeeDetail = function ()
        {
            // reqLocalCfg(function() {
                $('#right').children().map((i, v) => {
                    $(v).attr('id') === 'employee-detail' ? $(v).show() : $(v).hide();
                })
            // })
            
        }
        
        function saveGlobalSearchParams(data)
        {
            window.search_params = data;
        }
        function saveGlobalLeaveSearchParams (data)
        {
            window.leave_search_params = data;
        }