var parentId = null;
Template.table.created = function() {
    console.log("create table");
    parentId = _getParentId();
};

Template.table.helpers({
    generateRows: function(){
        var _form = Forms.findOne({'_id':parentId});
        return _form && _form[this.dbField];
    }
});


var _getParentId = function() {
    return Template.parentData(1).id;
};