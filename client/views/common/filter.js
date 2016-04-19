function collectionUnion() {
    var args = Array.prototype.slice.call(arguments);
    var it = args.pop();

    return _.uniq(_.flatten(args, true), it);
}
Template.slt_filter.viewmodel({
    filterCode: function () {
        return this.templateInstance.data;
    },
    filter: function () {
        let filterCode = this.filterCode();
        var trueFilter = Filters.findOne({filterCode: filterCode});
        return trueFilter
    },
    autorun: function () {
        let filterCode = this.filterCode();
        let subs1 = Meteor.subscribe('getFilterByCode', filterCode);
        let subs2 = Meteor.subscribe('getAllValuesByFilterCode', filterCode);
    },
    selectedFilter: [],
    events: {
        'change .form-control': function (e) {
            var value = (e.target.value !== 'Tất cả') ? e.target.value : null;
            this.selectedFilter(value);
            let _filterValues = FilterValues.get();
            console.log(value);
            if (value) {
                _filterValues = _.union(_filterValues, value);
            }
            else {
                let filterCode = this.filterCode();
                let filterValue = _.find(_filterValues, (fv)=>{return fv.indexOf(filterCode) === -1});
                _filterValues = _.without(_filterValues, filterValue);
            }
            FilterValues.set(_filterValues);
            console.info(FilterValues.get());
        }
    }
})