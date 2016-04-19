if (Meteor.isServer) {
    Meteor.publish("getAllUsers", function () {
        return Meteor.users.find()
    });

    Meteor.publish(null, function () {
        return Meteor.users.find({},{fields : {username : 1, roles : 1, profile : 1}})
    });

    Meteor.publish(null, function(){
        return Meteor.roles.find({})
    });

    Meteor.publish('getRegRecords', function(){
        return RegisterRecords.find();
    });

    Meteor.publish('getEvents', function(){
        return Events.find();
    });

    Meteor.publish('getFilters', function(){
        return Filters.find();
    });

    Meteor.publish('getFilterByCode', function(code){
        return Filters.find({filterCode: code});
    });

    Meteor.publish('getAllValues', function(){
        return AllValues.find();
    });

    Meteor.publish('getAllValuesByFilterCode', function(filterCode){
        return AllValues.find({haveFilterCode : filterCode});
    });

    Meteor.publish('getCusRecords', function(params,limit){
        var params = params || {},
            limit = limit || {},
            options = _.extend(limit, {sort : {updatedAt : -1}});
        return CustomerRecords.find(params, options);
    });

    Meteor.publish('getBookingFair', function(params,limit){
        var params = params || {},
            limit = limit || {},
            options = _.extend(limit, {sort : {insertedAt : -1}});
        return BookingFair.find(params, options);
    });

   /* Meteor.publish('getEventByCode', function(code){
        return Events.find({code : code});
    });

    Meteor.publish('getEventLogs', function(eventCode){
        return EventLogs.find({eventCode : eventCode});
    });

    Meteor.publish('getEventLogsByCodes', function(codes){
        return EventLogs.find({eventCode : {$in : codes}});
    })*/

    /*Meteor.publish('getRegistersByEvent', function(params, limit){
        var params = params || {},
            limit = limit || 70;
        return RegisterEvents.find(params, {limit : limit,sort: {dangkyluc: -1}});
    });

    Meteor.publish('getRegistersByEvent2', function(params){
        var params = params || {};
        return RegisterEvents.find(params);
    });*/
}