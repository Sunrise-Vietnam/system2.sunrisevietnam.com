BookingFair = new Meteor.Collection('booking_fair');
var schema = new SimpleSchema({
    instName: {
        type: String,
        label: 'Tên trường'
    },
    contactPerson: {
        type: String,
        label: 'Tên người liên hệ'
    },
    instAdd: {
        type: String,
        label: 'Địa chỉ'
    },
    instTel: {
        type: String,
        label: 'Số điện thoại',
        autoform: {
            afFieldInput: {
                type: 'tel'
            }
        }
    },
    instFax: {
        type: String,
        label: 'Fax',
        optional: true
    },
    instEmail: {
        type: String,
        label: 'Email',
        autoform: {
            afFieldInput: {
                type: 'email'
            }
        }
    },
    instWeb: {
        type: String,
        label: 'Website',
        optional: true
    },
    instType: {
        type: String,
        label: 'Loại'
    },
    attendFair: {
        type: Array,
        optional: true
    },
    'attendFair.$': {
        type: Object
    },
    'attendFair.$.name': {
        type: String
    },
    'attendFair.$.date': {
        type: Date
    },
    insertedAt: {
        type: Date,
        autoValue: function(){
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }
});
BookingFair.attachSchema(schema)
