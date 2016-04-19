Template.nav.events({
    'click .btn-logout' : function(e,t){
        e.preventDefault();
        Meteor.logout(function(error){
            if (error) console.error(error);
            if (!error) FlowRouter.go("welcome")
        });
    }
});
Template.pwChange.viewmodel({
    oldPW: '',
    newPW: '',
    password: '',
    canChangePW: function () {
        return !!this.oldPW() && !!this.newPW() && !!this.password() && !invalidPassword(this.newPW()) && this.newPW() === this.password();
    },
    messagePassword: function () {
        return invalidPassword(this.newPW()) ? "Mat khau phai co it nhat 6 ki tu, co chu hoa va so" : "Mat khau hop le";
    },
    changePW: function () {
        if(this.canChangePW()){
            Accounts.changePassword(this.oldPW(), this.password(), function (error) {
                if (!error) {
                    $.notify("Successfully changed!", {
                        className: 'success',
                        position: 'right bottom'
                    });
                }
                else {
                    console.error('Error');
                }
            });
        }
    }
})