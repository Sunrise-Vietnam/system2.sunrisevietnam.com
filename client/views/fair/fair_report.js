var FAIR_CODE = 'iJP5EBa9TmxckYHDT';

Template.fair_report.viewmodel({
    __selectedLocation: 'Tất cả',
    _fairLocations: function () {
        return AllValues.find({haveFilterCode: '6CXbF3agvsEsAjZSA'},{sort: {registeredAt: -1}})
    },
    _params : function(){
        var params = {eventcode : FAIR_CODE};
        var location = this.__selectedLocation();
        if(location !== 'Tất cả'){
            params = _.extend(params, {fairLocation : location});
        }
        return params;
    },
    _regRecords : function(){
        var params = this._params();
        return RegisterRecords.find(params,{sort: {registeredAt: -1}});
    },
    _totalRegisters : function(){
        return this._regRecords().count();
    },

    autorun : function(){
        var params = this._params();
        var limit = 10000;
        this.templateInstance.subscribe('getRegRecords');
    }
});