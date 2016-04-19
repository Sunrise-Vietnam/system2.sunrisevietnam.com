AllValues = new Meteor.Collection('all_values');
var schema = new SimpleSchema({
    valueName: {
        type: String,
        label: 'Tên giá trị'
    },
    valueColor: {
        type: String,
        label: 'Màu của label',
        optional: true
    },
    valueCode: {
        type: String,
        label: 'Mã giá trị',
        unique: true,
        autoValue: function(){
            if (this.isInsert && !this.isUpdate) {
                return Random.id()
            }
        }
    },
    haveFilterCode: {
        type: String,
        label: 'Tên bộ lọc',
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function() {
                    return Filters.find({filterCode: {$exists: true}}, {sort: {filterName: 1}}).map(function (c) {
                        return {label: c.filterName, value: c.filterCode};
                    });
                }
            }
        }
    },
    byBranch: {
        type: String,
        label: 'Phụ trách bởi chi nhánh',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'select',
                firstOption: 'Tất cả',
                options: function () {
                    return AllValues.find({haveFilterCode: 'TvLJviY7wXkxJboKS'}).map(function (c) {
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
            if (this.isInsert || this.isUpdate) {
                return Meteor.userId()
            }
        }
    }
});
AllValues.attachSchema(schema)