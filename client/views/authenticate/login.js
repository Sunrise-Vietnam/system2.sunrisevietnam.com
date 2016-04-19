Template.login.events({
    'click button[type="submit"]' : function(e,t){
        e.preventDefault();
        var email = $('#txtEmail').val() || '',
            password = $('#txtPassword').val() || '';
        if(email && password){
            Meteor.loginWithPassword(email, password, function(error){
                if(error){
                    console.error(error);
                }else{
                    FlowRouter.go('/');
                }
            })
        }
    }
})