var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var fields = ['regName','phone', 'email'];
CheckinSearch = new SearchSource('RegisterRecords', fields, options);

Template.checkin_fair.viewmodel({
    citySearch : '',
    validateSearch : function(){
        return (this.citySearch());
    },
    _regrecords : function(){
        return CheckinSearch.getData({
            transform : function(matchText, regExp){
                return matchText.replace(regExp, "<b style='color:green'>$&</b>")
            },
            sort : {registedAt : -1}
        })
    },
    isLoading : function(){
        return CheckinSearch.getStatus().loading;
    },
    events : {
        'click ._insertAttendantModal' : function(){
            var modalId = Blaze.renderWithData(Template.modal_insertAttendant, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#insertAttendantModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        },
        'click ._fairReportModal' : function(){
            var modalId = Blaze.renderWithData(Template.modal_fairReport, this.templateInstance.data, document.getElementsByTagName('body')[0]);
            $('#fairReportModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        },
        "keyup #search-box": _.throttle(function(e) {
            var fairLocate = this.citySearch();
            var text = $(e.target).val().trim();
            var options = {fairLocation : fairLocate};
            CheckinSearch.search(text, options);
        }, 200)
    }
});

Template.modal_fairReport.viewmodel({
    fairLocation: 'all',
    params: function(){
        var fairLocation = this.fairLocation();
        var params = {eventCode: ''};
        if(fairLocation !== 'all'){
            params = _.extend(params, {fairLocation: fairLocation});
        }
        return params;
    },
    autorun : function(){
        var params = this.params();
        this.templateInstance.subscribe('getRegistersByEvent2', params);
    },
    preRegisted : function(){
        var params = this.params();
        var total = RegisterRecords.find(params).count() || 0;
        return preRegisted = total - this.registedAtPlace()
    },
    preRegCheckedin : function(){
        var params = _.extend(this.params(), { attendedAt: { $exists: true}, regedAtPlace: false});
        return preRegCheckedin = RegisterRecords.find(params).count()
    },
    unCheckin : function(){
        var preRegisted = this.preRegisted();
        var preRegCheckedin = this.preRegCheckedin();
        return unCheckin = preRegisted - preRegCheckedin
    },
    registedAtPlace : function() {
        var params = _.extend(this.params(), {regedAtPlace: true});
        var registedAtPlace = RegisterRecords.find(params).count() || 0;
        return registedAtPlace;
    }
});

Template.row_search.viewmodel({
    haveTicket: function(){
        return (_.some(this.data().status, function(status){
            return status == 'receivedticket'
        }));
    },
    updateGetTicket: function(e){
        var registerid = this.data()._id;
        var ifCheck = $(e.target).prop('checked');
        Meteor.call('getTicketEvent', registerid, ifCheck, numofTicket, function (err) {
            if (err) {
                console.error(err)
            }
            else {
                console.info('Customer detail updated');
                $.notify("Customer detail updated!", {
                    className: 'success',
                    position: 'right bottom'
                });
            }
        });
    },
    getCheckin: function () {
        return (this.data().attendedAt)
    },
    updateFairCheckin: function (e) {
        var registerid = this.data()._id;
        var ifCheck = $(e.target).prop('checked')
        console.log(ifCheck);
        Meteor.call('checkinEvent', registerid,ifCheck, function (err, results) {
            if (err) {
                console.error(err)
            }
            else {
                console.info('Customer detail updated');
                $.notify("Customer detail updated!", {
                    className: 'success',
                    position: 'right bottom'
                });
            }
        });
    }
});