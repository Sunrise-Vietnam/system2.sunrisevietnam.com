SimpleSchema.debug = true;
Template.customer_records.viewmodel({
    limit: 70,
    loaded: 0,
    _filters: function () {
        return Filters.find({forCustomer: true}, {sort: {filterName: 1}})
    },
    _cusRecords: function () {
        return CustomerRecords.find(this.params(), {limit: this.loaded()})
    },
    _insertCustomer: function (e) {
        e.preventDefault();
        var modalId = Blaze.renderWithData(Template.modal_insertCustomer, null, document.getElementsByTagName('body')[0]);
        $('#insertCustomerModal').modal('show').on('hidden.bs.modal', function (e) {
            Blaze.remove(modalId);
        });
    },
    quantity: function () {
        var params = this.params();
        return CustomerRecords.find(params).count() || 0;
    },
    hasMoreRecords: function () {
        return this._cusRecords().count() >= this.limit();
    },
    loadMoreRecords: function () {
        e.preventDefault();
        var limit = this.limit();
        limit += 50;
        this.limit(limit);
    },
    params : function(){
        var params = {updatedBy: Meteor.userId()};
        return params;
    },

    autorun: function () {
        var limit = this.limit();
        var subscription = this.templateInstance.subscribe('getCusRecords', this.params(), {limit: limit});
        if (subscription.ready()) {
            this.loaded(limit);
        }
    }
});

Template.row_cusRecord.viewmodel({
    _records: function(){
        return this.templateInstance.data;
    },
    DOB: function(){
        return (this._records().DoB) ? moment(this._records.DoB).format('MM/DD/YYYY') : '';
    },
    State: function(){
        var state = this._records().state;
        var getState = AllValues.findOne({valueCode: state});
        return getState.valueName
    },
    _isDraft: function () {
        return this.templateInstance.data.isDraft || false;
    },
    _isDraftClass: function () {
        return (this._isDraft()) ? 'td-record-draft' : '';
    },
    _canModifier: function () {
        return this.data().updatedBy === Meteor.userId();
    },
    events : {
        'click ._editCustomer' : function(){
            var modalId = Blaze.renderWithData(Template.modal_editCustomer, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#editCustomerModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        }
    }
});

Template.modal_insertCustomer.viewmodel({
    /*constuctor: function () {
        var data = this.templateInstance.data || null;
        if (data) {
            this.load(_.extend(data, {
                ExtraInfo: data.ExtraInfo.map(function (ex) {
                    return _.extend(ex, {Id: _.uniqueId()});
                }),
                Admission_Courses: data.Admission_Courses.map(function (ac) {
                    return _.extend(ac, {Id: _.uniqueId()});
                })
            }));
        } else {
            this.load({
                FullName: '',
                Email: '',
                Phone: '',
                Dob: '',
                Address: '',
                SchoolName: '',
                ClassName: '',
                AtSchool: '',
                Country: '',
                selectedStatus: '',
                selectedPrograms: [],
                selectedSources: [],
                ExtraInfo: [],
                Admission_ID: '',
                Admission_startDate: '',
                Admission_endDate: '',
                Admission_Courses: [{
                    Id: _.uniqueId(),
                    Name: '',
                    Fee: '',
                    _Unit: 'USD',
                }],
                Admission_contactSchool: '',
            })
        }
    },
    title: function () {
        return (this.templateInstance.data) ? 'Sửa hồ sơ' : 'Thêm mới hồ sơ';
    },
    /!*FullName: '',
    Email: '',
    Phone: '',
    Dob: '',
    Address: '',
    SchoolName: '',
    ClassName: '',
    AtSchool: '',
    Country: '',

    selectedStatus: '',
    selectedPrograms: [],
    selectedSources: [],
    Admission_ID: '',*!/
    Admission_startDate: '',
    Admission_endDate: '',
    Admission_Courses: [],
    Admission_contactSchool: '',



    _removeCourse: function (id) {
        var admissionCourses = _.without(this.Admission_Courses(), _.findWhere(this.Admission_Courses(), {Id: id}));
        this.Admission_Courses(admissionCourses);
    },
    _saveRecord: function (isDraft) {
        try {
            var extraInfo = this.children('modal_Record_Extra_Info').map(function (ex) {
                return {
                    FullName: ex.FullName(),
                    Email: ex.Email(),
                    Phone: ex.Phone(),
                    Address: ex.Address()
                }
            });

            var admission_Courses = this.children('modal_Record_Course').map(function (ac) {
                return {
                    Name: ac.Name(),
                    Fee: ac.Fee(),
                    _Unit: ac._Unit()
                }
            });


            var record = {
                FullName: s.titleize(this.FullName()),
                Email: this.Email(),
                Phone: this.Phone(),
                Dob: this.Dob() || '',
                Address: this.Address() || '',
                SchoolName: this.SchoolName() || '',
                ClassName: this.ClassName() || '',
                AtSchool: this.AtSchool() || '',
                Country: this.Country() || '',
                ExtraInfo: extraInfo,
                selectedStatus: this.selectedStatus() || '',
                selectedPrograms: this.selectedPrograms().map(function (s) {
                    return s
                }) || [],
                selectedSources: this.selectedSources().map(function (s) {
                    return s
                }) || [],
                Admission_ID: this.Admission_ID(),
                Admission_startDate: this.Admission_startDate(),
                Admission_endDate: this.Admission_endDate(),
                Admission_Courses: admission_Courses,
                Admission_contactSchool: this.Admission_contactSchool(),
            }

            //console.info(record);
            record = (this.templateInstance.data) ? _.extend(record, {_id: this.templateInstance.data._id}) : record;
            var isDraft = isDraft || false;
            record = _.extend(record, {isDraft: isDraft});

            Meteor.call('UpdateRecord', record, function (err, rs) {
                if (err) {
                    $.notify(err.message, {
                        className: 'error',
                        position: 'right bottom'
                    });
                }
                ;
                if (rs) {
                    $('#modal_Record').modal('hide');
                    $.notify("Cập nhật thành công!", {
                        className: 'success',
                        position: 'right bottom'
                    });
                }
            })
        } catch (ex) {
            $.notify(ex.message, {
                className: 'error',
                position: 'right bottom'
            });
        }
    },
    __Programs: function () {
        return Meteor.settings.public.Record.Programs || []
    },
    __Status: function () {
        return Meteor.settings.public.Record.Status || []
    },
    __Sources: function () {
        return Meteor.settings.public.Record.Sources || []
    },
    __canSaved: function () {
        return this.FullName() && this.Dob() && (this.Email() || this.Phone()) && this.Address() && (this.SchoolName() || this.ClassName()) && this.AtSchool() && this.Country() && (this.selectedPrograms().length > 0) && (this.selectedSources().length > 0) && this.selectedStatus();
    },
    __canSavedDraft: function () {
        return this.FullName() && this.Dob();
    },
    onCreated: function () {
        this.constuctor();
    },
    onRendered: function () {
        var self = this;
        $(document).ready(function () {
            $('#txtDoB').maskInput('99/99/9999', function (e) {
                self.Dob(e.maskedValue);
            });

            var dateRange_cfg = {
                //autoUpdateInput: false,
                locale: {
                    format: 'DD/MM/YYYY',
                    cancelLabel: 'Huỷ',
                    applyLabel: 'Kết thúc',
                }
            }

            if (self.Admission_startDate() && self.Admission_endDate()) _.extend(dateRange_cfg, {
                startDate: self.Admission_startDate(),
                endDate: self.Admission_endDate()
            })

            $('input[name="daterange"]').daterangepicker(dateRange_cfg);

            $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
                self.Admission_startDate(new Date(picker.startDate.toString()));
                self.Admission_endDate(new Date(picker.endDate.toString()));

                //$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            });

            $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
                $(this).val('');
            });
        })
    }*/
});

Template.modal_editCustomer.viewmodel({

})

Template.form_customer.viewmodel({
    _parentsInfo: [],
    _admissionCourses: [],
    _addParentsInfo: function (e) {
        this._parentsInfo().push({
            Id: _.uniqueId(),
            name: '',
            email: '',
            phone: '',
            workAt: ''
        });
    },
    _removeParentsInfo: function (id) {
        var parentsInfo = _.without(this._parentsInfo(), _.findWhere(this._parentsInfo(), {Id: id}));
        this._parentsInfo(parentsInfo);
    },
    _addCourse: function (e) {
        this._admissionCourses().push({
            Id: _.uniqueId(),
            name: '',
            fee: '',
            unit: ''
        });
    },
    _removeCourse: function (id) {
        var admissionCourses = _.without(this._admissionCourses(), _.findWhere(this._admissionCourses(), {Id: id}));
        this._admissionCourses(admissionCourses);
    }
});

Template.row_parentsInfo.viewmodel({
    name: '',
    email: '',
    phone: '',
    workAt: '',
    _removeParentsInfo: function (e) {
        var id = this.data().Id;
        this.parent()._removeParentsInfo(id)
    }
});

Template.row_admissionCourse.viewmodel({
    name: '',
    fee: '',
    unit: '',
    _removeCourse: function () {
        var id = this.data().Id;
        this.parent()._removeCourse(id);
    },
    onCreated: function () {
        var data = this.templateInstance.data;
        this.load(data);
    }
})

Template.row_potentialList.viewmodel({

})