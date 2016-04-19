Events = new Meteor.Collection('events');
var schema = new SimpleSchema({
    eventName: {
        type: String,
        label: 'Tên sự kiện'
    },
    eventCode: {
        type: String,
        label: 'Mã sự kiện',
        unique: true,
        autoValue: function(){
            if (this.isInsert && !this.isUpdate) {
                return Random.id()
            }
        }
    },
    filtersSet: {
        type: [String],
        label: 'Gồm các thông tin'
    },
    isFair: {
        type: Boolean,
        label: 'Triển lãm du học'

    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    createdBy: {
        type: String,
        label: 'Được tạo bởi',
        autoValue: function() {
            return Meteor.userId()
        }
    },
    updatedAt: {
        type: Date,
        label: 'Cập nhật lúc',
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    },

});
Events.attachSchema(schema)
