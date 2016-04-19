Template.registerHelper('humanDate', function (date, onlyDate) {
    var onlyDate = onlyDate || false;
    var format = (onlyDate && onlyDate === true) ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm:ss';
    return (date) ? moment(date).format(format) : '';
});

Template.registerHelper('getRecordPrograms', function (ids) {
    var ids = ids || [];
    return ids.map(function (i) {
        var program = _.findWhere(Meteor.settings.public.Record.Programs, {id: i});
        return program.value || '';
    }).join(', ');
})

Template.registerHelper('getRecordStatusName', function (id) {
    if (!id) return '';
    var status = _.findWhere(Meteor.settings.public.Record.Status, {id: id});
    return status.value || '';
});

Template.registerHelper('getSourcesNames', function (ids) {
    var ids = ids || [];
    return ids.map(function (i) {
        var source = _.findWhere(Meteor.settings.public.Record.Sources, {id: i});
        return source.value || '';
    });
});

Template.registerHelper('getFullNameOfUser', function (userId) {
    var user = Meteor.users.findOne({_id: userId});
    return (user) ? user.profile.fullname : '';
})

Template.registerHelper('_titleize', function (str) {
    return s.titleize(str);
})