Filters = new Meteor.Collection('filters');
var schema = new SimpleSchema({
    filterName: {
        type: String,
        label: 'Tên bộ lọc'
    },
    filterCode: {
        type: String,
        label: 'Mã bộ lọc',
        unique: true,
        autoValue: function(){
            if (this.isInsert && !this.isUpdate) {
                return Random.id()
            }
        }
    },
    forRegister: {
        type: Boolean,
        label: 'Dành cho người đăng ký',
        autoform: {
            afFieldInput: {
                type: 'boolean-checkbox'
            }
        }
    },
    forCustomer: {
        type: Boolean,
        label: 'Dành cho hồ sơ du học',
        autoform: {
            afFieldInput: {
                type: 'boolean-checkbox'
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
            if (this.isInsert || this.isUpdate) {
                return Meteor.userId()
            }
        }
    }
});

Filters.helpers({
    getValues : function(){
        let filterCode = this.filterCode;
        return AllValues.find({haveFilterCode : filterCode});
    }
})

Filters.attachSchema(schema)

