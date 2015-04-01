var parentId = null;
Template.text_form_field.created = function() {
    parentId = _getParentId();
};

Template.text_form_field.helpers({
    "value": function() {
        var _form;
        if (_isNestedObject()) {
            _form = Template.parentData(1);
        } else {
            _form = Forms.findOne({_id: parentId});
        }
        return _form && _form[this.dbField];
    }
});

Template.text_form_field.events({
    "keyup input": function(event) {
        var _newValue = $(event.target).val();
        var _setQuery = {$set: {}};

        if (_isNestedObject()) {
            _setQuery = _returnNestedObjectUpdateQueryWith(_newValue, this.dbField);

        } else {
            _setQuery = _returnObjectUpdateQueryWith(_newValue, this.dbField)
        }

        Forms.update({_id: parentId}, _setQuery);
    }
});


var _getParentId = function() {
    var _parentData;
    if (_isNestedObject()) {
         _parentData = Template.parentData(3);
    } else {
         _parentData = Template.parentData(1);
    }
    return _parentData.id;
};

var _isNestedObject = function() {
    var _parentData = Template.parentData(2);
    return _parentData && _parentData.table;
};

var _returnNestedObjectUpdateQueryWith = function(newValue, dbField) {
    var _setQuery = {$set: {}};
    var _form = Forms.findOne({_id: parentId});
    var _row = _getRowContext();
    var _arrayContext = _getArrayContext();

    var _rowIndex = _.indexOf(_.pluck(_form[_arrayContext.dbField], 'id'), _row.id);

    _setQuery["$set"][_arrayContext.dbField + "." + _rowIndex + "." + dbField] = newValue;

    return _setQuery;
};

var _returnObjectUpdateQueryWith = function(newValue, dbField) {
    var _setQuery = {$set: {}};
    _setQuery["$set"][dbField] = newValue;
    return _setQuery;
};

var _getRowContext = function(){
    return Template.parentData(1);
};

var _getArrayContext = function() {
    return Template.parentData(2);
};