var parentId = null;
var dbField;
Template.table.created = function() {
    parentId = _getParentId();
    dbField = this.data.dbField;
};

Template.table.helpers({
    dynamicRows: function(){
        var _form = Forms.findOne({'_id':parentId});
        return _form && _form[this.dbField];
    }
});

Template.table.events({
    'click .deleteRow': function(e){
        var _setQuery = {$set: {}};
        var _form = Forms.findOne({'_id':parentId});
        var _rowIndex = _.indexOf(_.pluck(_form[dbField], 'id'), this.id);

        _form[dbField].splice(_rowIndex, 1);
        _setQuery['$set'][dbField] = _form[dbField];

        Forms.update({'_id': parentId}, _setQuery);
    }
});

var _getParentId = function() {
    return Template.parentData(1).id;
};