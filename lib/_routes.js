if(Meteor.isClient){
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/',{
    name : 'home',
    subscriptions : function(p, q){
        this.register('getFilters', Subs.subscribe('getFilters'));
        this.register('getAllValues', Subs.subscribe('getAllValues'));
        this.register('getRegRecords', Subs.subscribe('getRegRecords'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top : 'nav',
            main : 'home'
        })
    }
});

FlowRouter.route('/register-records',{
    name : 'register_records',
    subscriptions : function(p, q){
        this.register('getRegRecords', Subs.subscribe('getRegRecords'));
        this.register('getEvents', Subs.subscribe('getEvents'));
        this.register('getFilters', Subs.subscribe('getFilters'));
        this.register('getAllValues', Subs.subscribe('getAllValues'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top : 'nav',
            main : 'register_records'
        })
    }
});

FlowRouter.route('/booking-fair',{
    name : 'booking_fair',
    triggersEnter : [requireIsAdminOrManager],
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'booking_fair'
        })
    }
});

FlowRouter.route('/check-in-fair',{
    name : 'checkin_fair',
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'checkin_fair'
        })
    }
});

FlowRouter.route('/fair-report',{
    name : 'fair_report',
    subscriptions : function(p, q) {
        this.register('getAllValues', Subs.subscribe('getAllValues'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'fair_report'
        })
    }
});

FlowRouter.route('/customer-records',{
    name : 'customer_records',
    triggersEnter : [requireIsAdminOrManagerOrConsultant],
    subscriptions : function(p, q) {
        this.register('getCusRecords', Subs.subscribe('getCusRecords'));
        this.register('getFilters', Subs.subscribe('getFilters'));
        this.register('getAllValues', Subs.subscribe('getAllValues'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'customer_records'
        })
    }
});

FlowRouter.route('/customers-report',{
    name : 'customers_report',
    triggersEnter : [requireIsAdminOrManagerOrAccountant],
    subscriptions : function(p, q) {
        this.register('getCusRecords', Subs.subscribe('getCusRecords'));
        this.register('getFilters', Subs.subscribe('getFilters'));
        this.register('getAllValues', Subs.subscribe('getAllValues'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'customers_report'
        })
    }
});

FlowRouter.route('/users_manage',{
    name : 'users_manage',
    triggersEnter: [requireIsAdmin],
    subscriptions : function(p, q){
        this.register('getAllUsers', Subs.subscribe('getAllUsers'));
        this.register('getAllValues', Subs.subscribe('getAllValues'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'users_manage'
        })
    }
});

FlowRouter.route('/events_manage',{
    name : 'events_manage',
    triggersEnter: [requireIsAdmin],
    subscriptions : function(p, q){
        this.register('getEvents', Subs.subscribe('getEvents'));
        this.register('getFilters', Subs.subscribe('getFilters'));
        this.register('getAllValues', Subs.subscribe('getAllValues'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'events_manage'
        })
    }
});

FlowRouter.route('/register_manage',{
    name : 'register_manage',
    triggersEnter: [requireIsAdmin],
    subscriptions : function(p, q){
        this.register('getRegRecords', Subs.subscribe('getRegRecords'));
    },
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{
            top: 'nav',
            main : 'register_manage'
        })
    }
});

FlowRouter.route('/welcome',{
    name : 'welcome',
    action : function(p, q){
        BlazeLayout.render('blankLayout',{
            main : 'welcome'
        })
    }
});

FlowRouter.route('/login',{
    name : 'login',
    action : function(p, q){
        BlazeLayout.render('blankLayout',{
            main : 'login'
        })
    }
});

FlowRouter.triggers.enter([requiredLogin],{except : ['welcome','login']});

function requiredLogin(context, redirect){
    if(!Meteor.userId()) redirect(FlowRouter.path('/welcome'));
}

function requireIsAdmin(context, redirect){
    var isAdmin = Roles.userIsInRole(Meteor.userId(),['admin']);
    if(!isAdmin) redirect(FlowRouter.path('/'))
}

function requireIsAdminOrManager(context, redirect){
    var isAdmin = Roles.userIsInRole(Meteor.userId(),['admin','manager']);
    if(!isAdmin) redirect(FlowRouter.path('/'))
}

function requireIsAdminOrManagerOrAccountant(context, redirect){
    var isAdmin = Roles.userIsInRole(Meteor.userId(),['admin','manager','accountant']);
    if(!isAdmin) redirect(FlowRouter.path('/'))
}

function requireIsAdminOrManagerOrConsultant(context, redirect){
    var isAdminOrConsultant = Roles.userIsInRole(Meteor.userId(),['admin','manager', 'consultant']);
    if(!isAdminOrConsultant) redirect(FlowRouter.path('/'));
}