var List = function(options) {
    this.name = options.name;
    this.items = options.items || [];
}

List.prototype = {
    addItem: function(item) {
        this.items.push(item);
    },

    size: function() {
        return this.items.length
    }
}

module.exports = List;