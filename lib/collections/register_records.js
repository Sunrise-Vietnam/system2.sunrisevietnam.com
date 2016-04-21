RegisterRecords = new Meteor.Collection('register_records');
var schema = new SimpleSchema({
    regName: {
        type: String,
        label: 'Tên khách hàng'
    },
    phone: {
        type: String,
        label: 'Số điện thoại',
        unique: true
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
    identity: {
        type: String,
        label: 'Người đăng ký là',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = '8Fk8EcAZJJtNesHvx';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    city: {
        type: String,
        label: 'Địa chỉ',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = 'uHTqtSpzHBNhzS2z2';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    eventcode: {
        type: String,
        optional: true,
        label: 'Chương trình',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    return Events.find().map(function (c) {
                        return {label: c.eventName, value: c.eventCode};
                    });
                }
            }
        }
    },
    catecode: {
        type: String,
        label: 'Đăng ký qua',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = 'L4YfwtNgqDpsvBkuF';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    regCourse: {
        type: [String],
        optional: true,
        label: "Khoá học",
        autoform: {
            afFieldInput: {
                type: 'select-checkbox-inline',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = 'wdGC8jQKDkXuRxHj6';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    regCountry: {
        type: [String],
        optional: true,
        label: "Du học tại",
        autoform: {
            afFieldInput: {
                type: 'select-checkbox-inline',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = 'gd6yuyx76ahjkh';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    regTime: {
        type: String,
        label: "Thời gian du học",
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = 'WQb64Ni8wWcrZfrHE';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    regStudy: {
        type: String,
        optional: true,
        label: "Nhu cầu học",
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = '7twn9oTKjA4G3tzst';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    knownBy: {
        type: [String],
        optional: true,
        label: "Biết thông tin qua",
        autoform: {
            afFieldInput: {
                type: 'select-checkbox-inline',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = 'JPKdB6R8cHtyjY6oG';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    status: {
        type: [String],
        label: 'Trạng thái',
        /*autoValue: function(){
         if (this.isInsert) {
         return '';
         } else if (this.isUpsert) {
         return '';
         } else {
         this.unset();  // Prevent user from supplying their own value
         }
         },*/
        autoform: {
            afFieldInput: {
                type: 'select-checkbox-inline',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = 'qKSGrEg9w8gBGatku';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    tags : {
        type : [String],
        optional : true
    },
    registeredAt: {
        type: Date,
        label: 'Đăng ký lúc',
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    attendedAt: {
        type: Date,
        label: 'Đã tham dự',
        optional: true,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        },
        autoform: {
            afFieldInput: {
                type: 'boolean-checkbox'
            }
        }
    },// đã tham dự fair
    registeredAtPlace: {
        type: Boolean,
        optional: true,
        label: 'Đăng ký tại Fair'
    },
    fairLocation: {
        type: String,
        optional: true,
        label: 'Triển lãm tại',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    let filterCode = '6CXbF3agvsEsAjZSA';
                    return valuesOfFilter(filterCode);
                }
            }
        }
    },
    note: {
        type: String,
        optional: true,
        label: 'Ghi chú',
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 1
            }
        }
    },
    delQuest: {
        type: Boolean,
        optional: true
    },
    deleteReason: {
        type: String,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: 'Cập nhật lúc',
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    },
    updatedBy: {
        type: String,
        label: 'Cập nhật bởi',
        autoValue: function () {
            if (this.isInsert || this.isUpdate) {
                return Meteor.userId();
            }
        }
    }
});

let valuesOfFilter = (filterCode)=> {
    return AllValues.find({haveFilterCode: filterCode}).map(function (c) {
        return {label: c.valueName, value: c.valueCode};
    });
}

RegisterRecords.attachSchema(schema)