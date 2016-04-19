Template.home.viewmodel({
    _getBranches: function () {
        var branches = AllValues.find({haveFilterCode: 'TvLJviY7wXkxJboKS'});
        var i = 0;
        return branches.map(function (b) {
            var index = i++;
            return _.extend(b, {
                index: index,
                className: 'treegrid-' + (index) + '-0'
            });
        })
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
/*
Template.records_treeGrid_level_1.viewmodel({
    getUsers: function () {
        var branch = this.data();
        var users = Meteor.users.find({'profile.Branch': branch.id, roles: 'tuvan'}).fetch();
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
    getValueOfStatusAtBranch : function(status){
        var userIds = this.getUsers().map(function(u){return u._id});
        return StudyRecords.find({updatedBy : {$in : userIds},selectedStatus : status}).count() || 0;
    }
});

Template.records_treeGrid_level_2.viewmodel({
    getValueOfStatus : function(status){
        var user = this.data();
        return StudyRecords.find({updatedBy : user._id, selectedStatus : status}).count() || 0;
    },
    _viewDetail : function(){
        var user = this.data();
        var _data = {
            title : user.profile.FullName,
            records : StudyRecords.find({updatedBy : user._id})
        }
        var modalId = Blaze.renderWithData(Template.modal_records_treeGrid_Detail, _data, document.getElementsByTagName('body')[0]);
        $('#modal_records_treeGrid_Detail').modal('show').on('hidden.bs.modal', function (e) {
            Blaze.remove(modalId);
        });
    }
});

Template.modal_records_treeGrid_Detail.viewmodel({
    onCreated : function(){
        console.log(this.data().records.fetch());
    }
})

Template.home.viewmodel({
});

Template.eventLog.viewmodel({
    event: function () {
        return this.templateInstance.data;
    },
    total : function(){
        var _event = this.event();
        var logs = EventLogs.find({eventCode: _event.code}).fetch();
        var totalRegisters = 0;
        _.each(logs, function (i) {
            return totalRegisters += i.soluong;
        });
        return totalRegisters;
    },
    pathDetail : function(){
        var code = this.event().code;
        if(code){
            return FlowRouter.path('event_detail', {code : code});
        }
    },
    pathChart : function(){
        var code = this.event().code;
        if(code){
            return FlowRouter.path('event_chart', {code : code});
        }
    },
    autorun: function () {
        if (this.event()) {
            Subs.subscribe('getEventLogs', this.event().code);
        }
    }
})*/

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
        console.log(cate.valueCode)
        return RegisterRecords.find({catecode: cate.valueCode}).count()
        //var total = reg.count();
        //return total
    },
    potential: function(){
        var cate = this.cates();
        console.log(cate.valueCode)
        var reg = RegisterRecords.find({catecode: cate.valueCode, status: 'LeEXHGgKhRLzRCo3P'})
        return reg.count()
    },
    notcalled: function(){
        var cate = this.cates();
        console.log(cate.valueCode)
        var reg = RegisterRecords.find({catecode: cate.valueCode, status: 'LeEXHGgKhRLzRCo3P'})
        return reg.count()
    }
})