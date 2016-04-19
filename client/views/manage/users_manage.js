getRole = function () {
    if (Meteor.settings.public && Meteor.settings.public.roles) {
        return Meteor.settings.public.roles;
    }
    return [];
};
Template.users_manage.viewmodel({
    getUsers: function () {
        return Meteor.users.find()
    },
    /*getRoles: function () {
        return Meteor.roles || [];
    },*/
    getBranches: function () {
        return AllValues.find({haveFilterCode: 'TvLJviY7wXkxJboKS'},{sort: {valueName: 1}}) || []
    },
    _insertUserModal: function (e) {
        e.preventDefault();
        var modalId = Blaze.renderWithData(Template.modal_insertUser, this.templateInstance.data, document.getElementsByTagName('body')[0]);
        $('#insertUserModal').modal('show').on('hidden.bs.modal', function (e) {
            Blaze.remove(modalId);
        });
    },
    helpers: function () {
        return {
            users: this.getUsers()
        }
    }
});

Template.row_user.viewmodel({
    user: function () {
        return this.templateInstance.data;
    },
    FullName: function () {
        return (this.user().profile) ? this.user().profile.fullname : '';
    },
    BranchName: function () {
        var branch = AllValues.findOne({valueCode: this.user().profile.branch});
        return (this.user().profile) ? branch.valueName : '';
    },
    userRole: function () {
        var userR = getRole();
        var roles = _.map(this.user().roles, function (r) {
            var i = _.find(userR, function (j) {
                return j.key === r;
            });
            return i.value;
        });
        return roles.join(", ");
    },
    _editUserModal: function (e) {
        e.preventDefault();
        var modalId = Blaze.renderWithData(Template.modal_editUser, this.user(), document.getElementsByTagName('body')[0]);
        $('#editUserModal').modal('show').on('hidden.bs.modal', function (e) {
            Blaze.remove(modalId);
        });
    },
    _delUserModal: function (e) {
        e.preventDefault();
        var modalId = Blaze.renderWithData(Template.modal_delUser, this.user(), document.getElementsByTagName('body')[0]);
        $('#delUserModal').modal('show').on('hidden.bs.modal', function (e) {
            Blaze.remove(modalId);
        });
    }
});

Template.modal_insertUser.viewmodel({
    branch: '',
    fullname: '',
    username: '',
    email: '',
    pwd: '',
    password: '',
    role: '',
    messageEmail: function () {
        return invalidEmail(this.email()) ? "Email không hợp lệ" : "Email hợp lệ";
    },
    messagePassword: function () {
        return invalidPassword(this.pwd()) ? "Phải có ít nhất 6 ký tự, chữ hoa và số" : "Mật khẩu hợp lệ";
    },
    getRole : function () {
        if (Meteor.settings.public && Meteor.settings.public.roles) {
            return Meteor.settings.public.roles;
        }
        return [];
    },
    getBranches : function () {
        return AllValues.find({haveFilterCode: 'TvLJviY7wXkxJboKS'},{sort: {valueName: 1}}) || []
    },
    canAddUser: function () {
        return !!this.username() && !!this.email() && !!this.pwd() && !!this.password() && !!this.role() && !invalidEmail(this.email()) && !invalidPassword(this.pwd()) && this.pwd() === this.password();
    },
    insertUser: function () {
        if (this.canAddUser()) {
            var newUser = {
                fullname: this.fullname(),
                username: this.username(),
                email: this.email(),
                password: this.password(),
                branch: this.branch(),
                roles: [this.role()]
            };
            var self = this;
            Meteor.call('createNewUser', newUser, function (err, result) {
                if (err) {
                    console.error(err)
                }
                if (result && result === true) {
                    $.notify("Successfully added!", {
                        className: 'success',
                        position: 'right bottom'
                    });
                    self.username('');
                    self.fullname('');
                    self.email('');
                    self.pwd('');
                    self.password('');
                    self.role('');
                    self.branch('');
                }
            });
        }
    }
});

Template.modal_editUser.viewmodel({
    branch: '',
    fullname: '',
    pwd: '',
    password: '',
    roles: '',
    onCreated: function () {
        this.load({
            fullname: (this.user().profile) ? this.user().profile.fullname : '',
            roles: this.user().roles[0],
            branch: (this.user().profile && this.user().profile.branch) ? this.user().profile.branch : ''
        })
    },
    user: function () {
        return this.templateInstance.data;
    },
    email: function () {
        return this.user().emails[0].address
    },
    messagePassword: function () {
        return invalidPassword(this.pwd()) ? "Phải có ít nhất 6 ký tự, chữ hoa và số" : "Mật khẩu hợp lệ";
    },
    getRole : function () {
        if (Meteor.settings.public && Meteor.settings.public.roles) {
            return Meteor.settings.public.roles;
        }
        return [];
    },
    getBranches : function () {
        return AllValues.find({haveFilterCode: 'TvLJviY7wXkxJboKS'},{sort: {valueName: 1}}) || []
    },
    canupdateUser: function () {
        return (!!this.password() && !invalidPassword(this.pwd()) && this.pwd()===this.password()) || (!!this.roles());
    },
    editUser: function () {
        if (this.canupdateUser()) {
            var userid = this.user()._id;
            var password = this.password() || '';
            var roles = [this.roles()];
            var fullname = this.fullname();
            var branch = this.branch();
            var self = this;
            Meteor.call('updateUser', {
                userId: userid,
                password: password,
                fullname: fullname,
                branch: branch,
                roles: roles
            }, function (err, result) {
                if (err) {
                    console.error(err)
                }
                if (result && result === true) {
                    $.notify("Successfully updated!", {
                        className: 'success',
                        position: 'right bottom'
                    });
                    self.pwd('');
                    self.password('');
                }
            });

        }
    }
});

Template.modal_delUser.viewmodel({
    user: function () {
        return this.templateInstance.data;
    },
    delUser: function () {
        var userid = this.user()._id;
        Meteor.call('deleteUser', userid, function (err, result) {
            if (err) {
                console.error(err)
            }
            if (result === true) {
                $.notify("Successfully deleted!", {
                    className: 'success',
                    position: 'right bottom'
                });
            }
        });
        $('#delUserModal').modal('hide');
    }
})