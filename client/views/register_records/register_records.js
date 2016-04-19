FilterValues = new ReactiveVar([]);
ViewModel.ignoreErrors = true;
AutoForm.hooks({
    insertRegRecordsForm: {
        formToDoc: function (doc) {
            let tags = _.union([], doc.catecode, doc.eventcode, doc.identity, doc.city, doc.regCourse, doc.regCountry, doc.regTime, doc.regStudy, doc.knownBy, doc.status, doc.fairLocation, doc.attendedAt);
            doc.tags = tags;
            return doc;
        }
    },
    editRegRecordsForm: {
        formToModifier: function (doc) {
            //doc.$set.tags = _.union([], doc.catecode, doc.eventcode, doc.identity, doc.city, doc.regCourse, doc.regCountry, doc.regTime, doc.regStudy, doc.knownBy, doc.status, doc.fairLocation, doc.attendedAt);
            //doc.tags = tags;
            console.log(doc.tags)
            return doc;
        },
        docToForm: function (doc) {
            console.info(doc);
            return doc;
        }
    }
});

Template.register_records.viewmodel({
    selectedEvent: null,
    selectedCate: null,
    selectedFairLoca: null,
    selectedAttend: null,
    loaded: 0,
    limit: 70,
    _regRecords: function () {
        var params = this.params();
        return RegisterRecords.find(params, {sort: {regName: 1}, limit: this.loaded()})
    },
    _events: function () {
        return Events.find()
    },
    _categories: function () {
        return AllValues.find({haveFilterCode: 'L4YfwtNgqDpsvBkuF'}, {sort: {valueName: 1}})
    },
    _filters: function () {
        return Filters.find({forRegister: true}, {sort: {filterName: 1}})
    },
    _allvalues: function () {
        return AllValues.find()
    },
    _updatedBy: function () {
        return Meteor.users.find({roles: 'supporter'});
    },
    _isFair: function () {
        var selectedEvent = this.selectedEvent();
        if (selectedEvent !== null) {
            var event = Events.findOne({eventCode: selectedEvent});
            if (event.isFair) return true
        }
    },
    _fairLocation: function () {
        return AllValues.find({haveFilterCode: '6CXbF3agvsEsAjZSA'}, {sort: {valueName: 1}})
    },
    params: function () {
        this.loaded(0);
        var catecode = this.selectedCate();
        var eventcode = this.selectedEvent();
        var fairLocation = this.selectedFairLoca();
        var attendedAt = this.selectedAttend();
        let selectedTag = FilterValues.get();
        var params = {};
        if (catecode) {
            selectedTag = _.union(selectedTag, catecode);
            params = _.extend(params, {tags: {$all: selectedTag}});

        }
        if (eventcode) {
            selectedTag = _.union(selectedTag, eventcode);
            params = _.extend(params, {tags: {$all: selectedTag}});
        }
        if (fairLocation) {
            selectedTag = _.union(selectedTag, fairLocation);
            params = _.extend(params, {tags: {$all: selectedTag}});
        }
        if (attendedAt) {
            selectedTag = _.union(selectedTag, attendedAt);
            params = _.extend(params, {tags: {$all: selectedTag}});
        }
        else {
            params = _.extend(params, {tags: {$all: selectedTag}});
        }
        console.info(params);
        return params

    },
    quantity: function () {
        var params = this.params();
        return RegisterRecords.find(params).count() || 0;
    },
    notcalled: function () {
        var params = _.extend(this.params(), {status: {$in: ['JL7vJtTNMWE84a8mf']}});
        return RegisterRecords.find(params).count() || 0;
    },
    hasMoreRegisters: function () {
        return this._regRecords().count() >= this.limit();
    },
    loadMoreRegisters: function () {
        var limit = this.limit();
        limit += 50;
        this.limit(limit);
    },
    colorSelect: function (e, r) {
        if (r) {
            if (!$(e).hasClass('colorselect')) {
                $(e).addClass('colorselect')
            }
        }
        else {
            $(e).removeClass('colorselect')
        }
    },
    events: {
        'click ._insertReg': function () {
            var modalId = Blaze.renderWithData(Template.modal_insertReg, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#insertRegModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        },
        'change .form-control': function (e) {
            var value = (e.target.value !== 'Tất cả') ? e.target.value : null;
            this.colorSelect(e.target, (value));
        },
        'change .filterByCate': function (e) {
            var value = (e.target.value !== 'Tất cả') ? e.target.value : null;
            this.selectedCate(value);
        },
        'change .filterByEvent': function (e) {
            var value = (e.target.value !== 'Tất cả') ? e.target.value : null;
            this.selectedEvent(value);
        },
        'change .filterByFairLoca': function (e) {
            var value = (e.target.value !== 'Tất cả') ? e.target.value : null;
            this.selectedFairLoca(value);
        },
        'change .filterByAttend': function (e) {
            if ($(e.target).prop('checked'))
                this.selectedAttend("true");
        }

    }
});

Template.row_regRecord.viewmodel({
    events: {
        'click ._editRegModal': function () {
            var modalId = Blaze.renderWithData(Template.modal_editReg, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#editRegModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        },
        'click ._delRequestModal': function () {
            var modalId = Blaze.renderWithData(Template.modal_delRequest, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#delRequestModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        }
    }
});

Template.row_regRecord.helpers({
    City: function () {
        var _city = Template.instance().data.city || null;
        var getCity = AllValues.findOne({valueCode: _city});
        return getCity.valueName;
    },
    RegCourse: function () {
        var RegCourse = [];
        _.each(Template.instance().data.regCourse, function (v) {
            var j = AllValues.findOne({valueCode: v});
            if (j) {
                RegCourse.push(j.valueName)
            }
        });
        return RegCourse.join(', ')
    },
    Status: function () {
        var Status = [];
        _.each(Template.instance().data.status, function (v) {
            var j = AllValues.findOne({valueCode: v});
            if (j) {
                Status.push(j.valueName)
            }
        });
        return Status.join(' ')
    },
    UpdatedBy: function () {
        var _updatedBy = Template.instance().data.updatedBy || null;
        var _user = Meteor.users.findOne({_id: _updatedBy});
        return (_user && _user.profile) ? _user.profile.fullname : '';
    }
});

Template.modal_delRequest.viewmodel({
    register: function () {
        return this.templateInstance.data;
    },
    _enable: function () {
        if ($('input[id="delReason3"]').prop('checked'))
            return true
    },
    canSendQuest: function () {
        //if($('input[type=radio]').prop('checked'))
        return true
    },
    sendDelQuest: function () {
        if (this.canSendQuest()) {
            var regID = this.register()._id;
            Meteor.call('addDelQuest', regID, function (err, result) {
                if (err) {
                    console.error(err)
                }
                else if (result) {
                    console.info("Success")
                }
            })
        }

    }
});

Template.form_register.viewmodel({})