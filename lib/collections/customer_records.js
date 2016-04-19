CustomerRecords = new Meteor.Collection('customer_records');
var schema = new SimpleSchema({
    recordCode: {
        type: String,
        unique: true,
        autoValue: function(){
            if (this.isInsert && !this.isUpdate) {
                return Random.id()
            }
        }
    },
    customerName: {
        type: String,
        label: 'Tên khách hàng'
    },
    DoB: {
        type: Date,
        label: 'Ngày sinh',
        autoform: {
            afFieldInput: {
                type: 'date'
            }
        }
    },
    email: {
        type: String,
        label: 'Email',
        autoform: {
            afFieldInput: {
                type: 'email'
            }
        }
    },
    phone: {
        type: String,
        label: 'Số điện thoại'
    },
    address: {
        type: String,
        label: 'Địa chỉ',
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 1
            }
        }
    },
    fromSchool: {
        type: String,
        label: 'Đến từ trường',
        optional: true
    },
    fromClass: {
        type: String,
        label: 'Học lớp',
        optional: true
    },
    regSchool: {
        type: String,
        label: 'Đi học trường'
    },
    schoolCountry: {
        type: String,
        label: 'Du học tại nước',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    return AllValues.find({haveFilterCode: 'gd6yuyx76ahjkh'}).map(function (c) {
                        return {label: c.valueName, value: c.valueCode};
                    });
                }
            }
        }
    },
    program: {
        type: String,
        label: 'Chương trình học',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    return AllValues.find({haveFilterCode: 'YNNuAWBwQAiEbBWo5'}).map(function (c) {
                        return {label: c.valueName, value: c.valueCode};
                    });
                }
            }
        }
    },
    state: {
        type: String,
        label: 'Trạng thái',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    return AllValues.find({haveFilterCode: 'T46tJHXqifszZ5NhJ'}).map(function (c) {
                        return {label: c.valueName, value: c.valueCode};
                    });
                }
            }
        }
    },
    source: {
        type: String,
        label: 'Khách hàng đến từ',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    return AllValues.find({haveFilterCode: 'Wb8uWu9AwQE9rn33b'}).map(function (c) {
                        return {label: c.valueName, value: c.valueCode};
                    });
                }
            }
        }
    },
    identity: {
        type: String,
        label: 'Người đăng ký là',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    return AllValues.find({haveFilterCode: '8Fk8EcAZJJtNesHvx'}).map(function (c) {
                        return {label: c.valueName, value: c.valueCode};
                    });
                }
            }
        }
    },
    parents: {
        type: [Parents],
        optional: true,
        blackbox: true
    },
    admission: {
        type: [Object],
        optional: true
    },
    /*'admission.$': {
        type: Object
    },*/
    'admission.$.admissionID': {
        type: String,
        label: 'ID nhập học'
    },
    'admission.$.admissionStartDate': {
        type: Date,
        label: 'Ngày nhập học',
        autoform: {
            afFieldInput: {
                type: 'date'
            }
        }
    },
    'admission.$.admissionEndDate': {
        type: Date,
        label: 'Ngày kết thúc',
        autoform: {
            afFieldInput: {
                type: 'date'
            }
        }
    },
    'admission.$.admissionSchoolInfo': {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 4
            }
        }
    },
    'admission.$.admissionCourses': {
        type: Array,
        optional: true
    },
    'admission.$.admissionCourses.$': {
        type: Object
    },
    'admission.$.admissionCourses.$.name': {
        type: String
    },
    'admission.$.admissionCourses.$.fee': {
        type: Number,
        autoform: {
            afFieldInput: {
                type: 'tel'
            }
        }
    },
    'admission.$.admissionCourses.$.unit': {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Đơn vị',
                options: function() {
                    return AllValues.find({haveFilterCode: 'HtgqRWjrhJhCyf8WW'}).map(function (c) {
                        return {label: c.valueName, value: c.valueCode};
                    });
                }
            }
        }
    },
    updatedAt: {
        type: Date,
        label: 'Cập nhật lúc',
        autoValue: function() {
            if (this.isInsert || this.isUpdate) {
                return new Date();
            }
        }
    },
    updatedBy: {
        type: String,
        label: 'Cập nhật bởi',
        autoValue: function() {
            return Meteor.userId()
        }
    }
});
var Parents = new SimpleSchema({
    _id: {
        type: String,
        autoValue: function(){
            return Random.id()
        }
    },
    name: {
        type: String
    },
    email: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'email'
            }
        }
    },
    phone: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'tel'
            }
        }
    },
    workAt: {
        type: String,
        optional: true
    }
})
CustomerRecords.attachSchema(schema)