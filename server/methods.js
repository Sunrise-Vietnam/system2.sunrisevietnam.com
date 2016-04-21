if(Meteor.isServer){
    Meteor.methods({
        createNewUser: function (newUser) {
            try {
                var isPass = Match.test(newUser, {
                    email: String,
                    username: String,
                    password: String,
                    fullname: String,
                    branch: String,
                    roles: [String]
                });
                if (isPass) {
                    var userId = Accounts.createUser({
                        username: newUser.username,
                        email: newUser.email,
                        password: newUser.password,
                        profile: {
                            fullname: newUser.fullname,
                            branch: newUser.branch
                        }
                    });
                    if (newUser.roles.length > 0) {
                        Roles.addUsersToRoles(userId, newUser.roles);
                    }
                    return true;
                }
                return false;
            }
            catch (ex) {
                console.log(ex)
            }
        },
        updateUser: function (obj) {
            try {
                var isPass = Match.test(obj, {
                    userId: String,
                    fullname: String,
                    branch: String,
                    password: String,
                    roles: [String]
                });
                //console.log(isPass);
                if (obj.password && obj.password.length > 0) {
                    Accounts.setPassword(obj.userId, obj.password);
                }
                Meteor.users.update({_id: obj.userId}, {
                    $set: {
                        roles: obj.roles,
                        'profile.fullname': obj.fullname,
                        'profile.branch': obj.branch
                    }
                });
                return true;
            }
            catch (ex) {
                console.log(ex)
                return false;
            }
        },
        deleteUser: function (userid) {
            try {
                var user = Meteor.settings.private.users;
                Meteor.users.remove(userid);
            }
            catch (ex) {
                console.log(ex)
            }
        },
        cancelDelQuest: function (regID) {
            try {
                var updatedAt = new Date(),
                    updatedBy = this.userID;
                RegisterRecords.update({_id: regID}, {
                    $set: {
                        delQuest: false,
                        updatedAt: updatedAt,
                        updatedBy: updatedBy
                    }
                })
            }
            catch (ex) {
                console.log(ex)
            }
        },
        addDelQuest: function (reg, deleteReason) {
            try {
                var updatedAt = new Date(),
                    updatedBy = this.userID,
                    deleteReason = deleteReason;
                RegisterRecords.update({_id: reg._id}, {
                    $set: {
                        delQuest: true,
                        deleteReason: deleteReason,
                        updatedAt: updatedAt,
                        updatedBy: updatedBy
                    }
                })
            }
            catch (ex) {
                console.log(ex)
            }
        },
        delRegister: function (regID) {
            try {
                var reg = regID;
                RegisterRecords.remove({_id: reg})
            }
            catch (ex) {
                console.log(ex)
            }
        },
        followCustomer: function (recordID) {
            try {
                CustomerRecords.update({_id: recordID}, {
                    $set: {
                        havePotential: false
                    }
                })
            }
            catch (ex) {
                console.log(ex)
            }
        },
        unFollowCustomer: function (recordID) {
            try {
                CustomerRecords.update({_id: recordID}, {
                    $set: {
                        havePotential: true
                    }
                })
            }
            catch (ex) {
                console.log(ex)
            }
        },
        deleteCustomer: function (recordID) {
            try {
                var record = recordID;
                CustomerRecords.remove({_id: record})
            }
            catch (ex) {
                console.log(ex)
            }
        }
    })
}