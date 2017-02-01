var assert = require('assert');
var List = require('../list');

describe('List', function() {
    var list;

    beforeEach(function() {
        var options = {
            name: 'My Bucket List',
            items: []};
        list = new List(options);
    });

    it('should start of empty', function() {
        assert.equal(list.size(), 0);
    });

    it('should have a name', function() {
        assert.equal('My Bucket List', list.name);
    });

    it('should be able to add countries', function() {
        list.addItem("Germany");
        assert.equal(list.size(), 1);
    });
})