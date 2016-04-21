Template.home.viewmodel({
    _branches: function () {
        return AllValues.find({haveFilterCode: 'TvLJviY7wXkxJboKS'});
    },
    startDate : null,
    endDate : null,
    params : function(){
        return {$or : [{isDraft : {$exists : false}},{isDraft : false}]}
    },
    getUsers: function (branchId) {
        return Meteor.users.find({'profile.Branch': branchId});
    },
    onRendered: function () {
        var self = this;
        $(document).ready(function(){
            $('input[name="daterange"]').daterangepicker({
                locale: {
                    format: 'DD/MM/YYYY',
                    cancelLabel : 'Huỷ',
                    applyLabel : 'Kết thúc',
                }
            });

            $('input[name="daterange"]').on('apply.daterangepicker',function(ev,picker){
                self.startDate(picker.startDate);
                self.endDate(picker.endDate);
            })
        })
    },
    autorun : function(){
        var subs = this.templateInstance.subscribe('getRecords',this.params());
        if(subs.ready()){
            $(document).ready(function(){
                setTimeout(function(){
                    $('.record_trees').treegrid({
                        initialState : 'collapsed',
                        expanderExpandedClass: 'glyphicon glyphicon-minus',
                        expanderCollapsedClass: 'glyphicon glyphicon-plus'
                    });
                },1000)
            })
        }
    }
});

Template.row_branchLevel1.viewmodel({
    getConsultants: function () {
        var branch = this.data();
        var users = Meteor.users.find({'profile.branch': branch.valueCode, roles: 'consultant'}).fetch();
        var i = 0;
        return users.map(function (u) {
            var index = ++i;
            return _.extend(u, {
                parentIndex: branch.index,
                index: index,
                className: 'treegrid-' + (branch.index) + '-' + index + ' treegrid-parent-' + (branch.index) + '-0'
            })
        })
    },
    getValueOfStateAtBranch : function(state){
        var userIds = this.getConsultants().map(function(u){return u._id});
        return CustomerRecords.find({updatedBy : {$in : userIds},state : state}).count() || 0;
    }
});

Template.row_branchLevel2.viewmodel({
    getValueOfState : function(state){
        var user = this.data();
        return CustomerRecords.find({updatedBy : user._id, state : state}).count() || 0;
    },
    _viewDetail : function(){
        var user = this.data();
        var _data = {
            title : user.profile.fullname,
            records : CustomerRecords.find({updatedBy : user._id})
        }
        var modalId = Blaze.renderWithData(Template.modal_recordDetail, _data, document.getElementsByTagName('body')[0]);
        $('#recordDetailModal').modal('show').on('hidden.bs.modal', function (e) {
            Blaze.remove(modalId);
        });
    }
});


Template.modal_recordDetail.viewmodel({
    onCreated : function(){
        console.log(this.data().records.fetch());
    }
});

Template.regReport.viewmodel({
    _cates: function(){
        //console.log(AllValues.find({havefilterCode:'L4YfwtNgqDpsvBkuF'}, {sort: {valueName:1}}))
        return AllValues.find({haveFilterCode: 'L4YfwtNgqDpsvBkuF'}, {sort: {valueName: 1}})
    }
});

Template.row_regReport.viewmodel({
    cates: function(){
        return this.templateInstance.data;
    },
    total: function(){
        var cate = this.cates();
        //console.log(cate.valueCode)
        return RegisterRecords.find({catecode: cate.valueCode}).count()
    },
    potential: function(){
        var cate = this.cates();
        //console.log(cate.valueCode)
        return RegisterRecords.find({catecode: cate.valueCode, status: 'LeEXHGgKhRLzRCo3P'}).count()
    },
    notcalled: function(){
        var cate = this.cates();
        //console.log(cate.valueCode)
        return RegisterRecords.find({catecode: cate.valueCode, status: 'LeEXHGgKhRLzRCo3P'}).count()
    }
})