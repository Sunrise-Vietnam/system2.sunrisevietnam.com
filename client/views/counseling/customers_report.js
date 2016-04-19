Template.customers_report.viewmodel({
    selectedRecords: [],
    selectedConsultant: '',
    selectedState: '',
    startDate: '',
    endDate: '',
    _limit: 50,
    _loaded: 0,
    _cusReport: function () {
        return CustomerRecords.find(this._params(), {limit: this._loaded()})
    },
    checkAllRecords: function (e) {
        $('input.chkRecord').map(function () {
            //$(this).prop('checked', e.target.checked);
            $(this).trigger('click');
        });
    },
    add_removeSelectedRecord: function (record, state) {
        var records = this.selectedRecords();
        if (state === 'add') {
            var isExistsRecord = _.some(records, function (r) {
                return r._id === record._id
            });
            if (isExistsRecord === false) {
                records.push(record);
            }
        } else if (state === 'remove') {
            records = _.filter(records, function (r) {
                return r._id !== record._id
            });
        }
        this.selectedRecords(records);
    },
    testSelected: function () {
        if (!!this.selectedRecords()) {
            var data = this.selectedRecords().map(function (record) {
                return record
            });
            var modalId = Blaze.renderWithData(Template.modal_copyCustomer, data, document.getElementsByTagName('body')[0]);
            $('#copyCustomerModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
            //console.info(this.selectedRecords());
        }
        else {
            return false;
        }
    },
    _hasMoreRecords: function () {
        return this._cusReport().count() >= this._limit();
    },
    _loadMoreRecords: function () {
        e.preventDefault();
        var limit = this._limit();
        limit += limit;
        this._limit(limit);
    },
    __disabledStateByAccountant: function () {
        return (Meteor.user().isAccountant()) ? 'disabled' : '';
    },

    _params: function () {
        var params = {$or: [{isDraft: {$exists: false}}, {isDraft: false}]};

        if (this.selectedConsultant() !== 'all') {
            params = _.extend(params, {updatedBy: this.selectedConsultant()});
        }

        if (this.selectedState() !== 'all') {
            params = _.extend(params, {selectedState: this.selectedState()});
        }

        if (this.startDate() && this.endDate()) {
            params = _.extend(params, {
                insertedAt: {
                    $gte: new Date(this.startDate().toString()),
                    $lte: new Date(this.endDate().toString())
                }
            })
        }
        return params;
    },
    getConsultant: function () {
        return Meteor.users.find({roles: 'consultant'}).fetch().map(function (user) {
            return {
                id: user._id,
                value: user.profile.fullname
            }
        });
    },
    getState: function () {
        return AllValues.find({haveFilterCode: 'T46tJHXqifszZ5NhJ'})
    },

    onCreated: function () {
        var thisYear = new Date().getFullYear();
        var defaultDateRange = {
            start: getMonthDateRange(thisYear, 1).start,
            end: getMonthDateRange(thisYear, 12).end
        };
        var defaultState = 'all';
        if (Meteor.user().isAccountant()) {
            defaultState = '_DA-NHAP-HOC';
        }
        this.load({
            selectedConsultant: 'all',
            selectedState: defaultState,
            startDate: defaultDateRange.start,
            endDate: defaultDateRange.end
        })
    },
    onRendered: function () {
        var self = this;
        $(document).ready(function () {
            $('input[name="daterange"]').daterangepicker({
                startDate: self.startDate(),
                endDate: self.endDate(),
                locale: {
                    format: 'DD/MM/YYYY',
                    cancelLabel: 'Huỷ',
                    applyLabel: 'Kết thúc',
                }
            });
            $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
                self.startDate(new Date(picker.startDate.toString()));
                self.endDate(new Date(picker.endDate.toString()));
                //$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            });
        })
    },
    autorun: function () {
        var limit = this._limit();
        var subscription = this.templateInstance.subscribe('getCusRecords', this._params(), {limit: limit});
        if (subscription.ready()) {
            this._loaded(limit);
        }
    }
});

Template.row_cusReport.viewmodel({
    events: {
        'click ._cusDetailModal': function () {
            var data = this.templateInstance.data;
            var modalId = Blaze.renderWithData(Template.modal_cusDetail, data, document.getElementsByTagName('body')[0]);
            $('#cusDetailModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        },
        'change .chkRecord': function (e) {
            var state = (e.target.checked) ? 'add' : 'remove';
            var record = this.templateInstance.data;
            this.parent().add_removeSelectedRecord(record, state);
        }
    }
});

Template.modal_copyCustomer.helpers({
    _cusReport : function(){
        return Template.instance().data;
    },
    /*    Admission_Courses: function(){
     var coursesName = '';
     _.each(Template.instance().data.Admission_Courses, function (v) {
     var j = _.findWhere(Records(), {_id: v});
     if (j) {
     return Admission_Courses.Name;
     console.info(coursesName)
     }
     });
     },*/
    displayCourses : function(courses){
        return courses.map(function(c){
            return c.name;
        }).join(',');
    },
    displayFee: function(courses){
        return courses.map(function(c){
            return c.fee;
            return c.unit;
        }).join(',');
    }
});

Template.modal_copyCustomer.onRendered(function(){
    $(document).ready(function(){
        setTimeout(function(){
            var tds = $('#tblRecords').find('tr > td');
            //console.log(tds.length);
            if(tds.length > 0){
                var firstNode = tds[0],
                    lastNode = tds[tds.length -1];
                var range = document.createRange();
                range.setStart(firstNode,0);
                range.setEnd(lastNode,0);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        },1000)
    });

})