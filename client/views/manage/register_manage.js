Template.register_manage.viewmodel({
    _delRequest: function(){
        return RegisterRecords.find({delQuest:true})
    }
});

Template.row_request.viewmodel({
    register: function (){
        return this.templateInstance.data
    },
    UpdatedBy: function () {
        var user = Meteor.users.findOne({_id: this.register().updatedBy});
        return (user) ? user.profile.fullname : '';
    },
    delReg: function(){
        var regID = this.register()._id;
        Meteor.call('delRegister', regID, function(err, result) {
            if (err) {
                console.error(err)
            }
            else if(result){
                console.info("Success")
            }
        })
    }
});