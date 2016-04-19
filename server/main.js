import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    if(Meteor.users.find().count()<=0){
        let users = Meteor.settings.private.users;
        _.each(users, function(user){
            let id = Accounts.createUser({
                username : user.username,
                password : user.password,
                email : user.email,
                profile: {
                    fullname: user.fullname,
                    branch: user.branch
                }
            })
            if (user.roles.length > 0) {
                Roles.addUsersToRoles(id, user.roles);
            }
        })
    }

    SearchSource.defineSource('RegisterRecords', function(searchText, options) {

        var _options = {sort: {regAt: -1}, limit: 20};
        var eventCode = 'Pk-FuP2cdvZDGopoPvnDAdLZDuhVCO29Cnv5s3ekeWN';
        //var search = JSON.parse(searchText);
        if(searchText && options.fairLocation) {
            var regExp = buildRegExp(searchText);
            var selector = {
                $and : [
                    {eventCode: eventCode},
                    {fairLocation: options.fairLocation},
                    {attendedAt: {$exists: true}},
                    {$or: [
                        {regName: regExp},
                        {phone: regExp},
                        {email: regExp},
                    ]}
                ]
            }

            return RegisterEvents.find(selector, _options).fetch();
        } else {
            return [];
        }
    });

    function buildRegExp(searchText) {
        // this is a dumb implementation
        var parts = searchText.trim().split(/[ \-\:]+/);
        return new RegExp("(" + parts.join('|') + ")", "ig");
    }

});
