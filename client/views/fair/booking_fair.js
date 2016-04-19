Template.booking_fair.viewmodel({
    _limit: 70,
    _loaded: 0,
    _bookfair : function(){
        return BookingFair.find();
    },
    autorun: function () {
        var limit = this._limit();
        var subscription = this.templateInstance.subscribe('getBookingFair', {}, {limit: limit});
        if (subscription.ready()) {
            this._loaded(limit);
        }
    },
    _hasMoreRegisters: function () {
        return this._bookfair().count() >= this._limit();
    },
    _loadMoreRegisters: function () {
        e.preventDefault();
        var limit = this._limit();
        limit += limit;
        this._limit(limit);
    },
});

Template.row_inst.viewmodel({
    events : {
        "click ._bookingFairModal" : function(e){
            var data = this.templateInstance.data;
            //if(data.instType === 'Other') data = _.extend(data, {instType : data.instTypeOther});
            var modalId = Blaze.renderWithData(Template.modal_bookingFair, data, document.getElementsByTagName('body')[0]);
            $('#bookingFairModal').modal('show').on('hidden.bs.modal', function (e) {
                Blaze.remove(modalId);
            });
        }
    }
})