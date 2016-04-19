Subs = new SubsManager();
Users = Meteor.users;

Users.helpers({
    isAdmin: function () {
        return Roles.userIsInRole(this._id, ['admin'])
    },
    isConsultant : function(){
        return Roles.userIsInRole(this._id, ['consultant']);
    },
    isAccountant : function(){
        return Roles.userIsInRole(this._id, ['accountant']);
    },
    isAdminOrConsultant : function(){
        return Roles.userIsInRole(this._id, ['admin','consultant']);
    },
    isAdminOrAccountant : function(){
        return Roles.userIsInRole(this._id, ['admin','accountant']);
    },
    isAdminOrManager : function(){
        return Roles.userIsInRole(this._id, ['admin','manager'])
    },
    isAdminOrManagerOrAccountant : function(){
        return Roles.userIsInRole(this._id, ['admin','manager','accountant']);
    },
    isAdminOrManagerOrConsultant: function () {
        return Roles.userIsInRole(this._id, ['admin', 'manager','consultant']);
    },
    displayName: function () {
        return (this.profile && this.profile.fullname) ? this.profile.fullname : this.username;
    }
})