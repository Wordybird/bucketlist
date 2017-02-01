var Countries = function() {

};

Countries.prototype = {

    makeRequest: function (url, callback) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = callback;
      request.send();
    },

    all: function(callback) {

        var self = this;

        this.makeRequest('https://restcountries.eu/rest/v1/all', function() {
            if (this.status !== 200) {
                return;
            }
            var jsonString = this.responseText;
            var results = JSON.parse(jsonString);

            var countries = self.populateCountries(results);
            callback(countries);
        });
    },

    populateCountries: function(results) {
        var countries = [];
        for (var result of results) {
            var country = {name: result.name};
            countries.push(country);
        }
        return countries;
    }   

}

module.exports = Countries;