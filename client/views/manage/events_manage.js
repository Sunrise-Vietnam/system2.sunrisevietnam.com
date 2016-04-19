Template.events_manage.viewmodel({
    _events: function(){
        return Events.find({eventCode: {$exists: true}}, {sort: {eventName: 1}})
    },
    _filters: function(){
        return Filters.find({filterCode: {$exists: true}}, {sort: {filterName: 1}})
    },
    _allvalues: function(){
        return AllValues.find({haveFilterCode: {$exists: true}}, {sort: {haveFilterCode: 1}})
    },
    _filtersSet: [],
    events: {
        'change .chooseFilter': function(e){
            var fil = Filters.findOne({filterName: e.target.value})
            var code = fil.filterCode
            $("input[name='haveFilterCode']").val(code)
        },
        'change ._filtersSet': function(e){
            var code = e.target.value
            //console.log(this._filtersCode())
            $("input[name='filtersSet']").val(this._filtersSet().join(', '));
        }
    }
});

Template.row_event.viewmodel({
    CreatedBy: function () {
        var _createdBy = Template.instance().data.createdBy || null;
        var _user = Meteor.users.findOne({_id: _createdBy});
        return (_user && _user.profile) ? _user.profile.fullname : '';
    },
    events: {
        'click ._editEventModal' : function(){
            var modalId = Blaze.renderWithData(Template.modal_editEvent, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#editEventModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        }
    }
});

Template.row_filter.viewmodel({
    events: {
        'click ._editFilterModal' : function(){
            var modalId = Blaze.renderWithData(Template.modal_editFilter, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#editFilterModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        }
    }
});

Template.row_value.viewmodel({
    FilterName: function(){
        var haveFilterCode = Template.instance().data.haveFilterCode || null
        var fil = Filters.findOne({filterCode: haveFilterCode})
        return (fil) ? fil.filterName : '';
    },
    events: {
        'click ._editValueModal' : function(){
            var modalId = Blaze.renderWithData(Template.modal_editValue, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#editValueModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        }
    }
})