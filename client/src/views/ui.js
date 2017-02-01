var Lists = require('../models/lists');
var Countries = require('../models/countries');

var UI = function() {
    this.lists = new Lists;
    this.countries = new Countries();
    this.lists.all(this.renderLists.bind(this));
    this.countries.all(function(result) {
         this.renderForm(result);
    }.bind(this));
}

UI.prototype = {
    createText: function(text, label) {
        var p = document.createElement('p');
        p.innerText = label + text;
        return p;
    },
    appendText: function(element, text, label) {
        var pTag = this.createText(text, label);
        element.appendChild(pTag);
    },
    createItem: function(li, item) {
        this.appendText(li, item, 'Country: ');
    },
    renderLists: function(lists) {
        var container = document.getElementById('lists');
        container.innerHTML = "";
        for (var list of lists) {
          var li = document.createElement('li');
          this.appendText(li, list.name, 'list: ');
          for (var item of list.items){
            this.createItem(li, item);
          }
          container.appendChild(li);
        }
    },
    addListSelect: function(collection) {
        var select = document.createElement('select');
        select.name = "list"
        for (var item of collection) {
          var option = document.createElement('option');
          option.value = item.name;
          option.text = item.name;
          select.appendChild(option);
        }
        this.form.appendChild(select);
    },
    addCountrySelect: function(collection) {
        var select = document.createElement('select');
        select.name = "country"
        for (var item of collection) {
          var option = document.createElement('option');
          option.value = item.name;
          option.text = item.name;
          select.appendChild(option);
        }
        this.form.appendChild(select);
    },
    createForm: function(){
      //create the form and a div
      var div = document.createElement('div');
      var form = document.createElement('form');
      var body = document.querySelector('body');
      //append input boxes to the form
      var nameInput = document.createElement('input');
      nameInput.setAttribute("name", "name");
      form.appendChild(nameInput);
      var button = document.createElement('button');
      button.type = 'submit';
      button.innerText = 'Add Film';
      form.appendChild(button);
      //add event handler to the onSubmit event of the form
      form.onsubmit = function(e){
        e.preventDefault();
        var newList = {
          title: e.target.name.value,
        }
        var lists = new Lists(); 
        films.add(newList, function(data){
          console.log(data);
        });
      }
    },
    renderForm: function(countries) {
        this.form = document.getElementById('ourForm');
        this.form.innerHTML = "";
        var button = document.createElement('button');
        button.type = 'submit';
        button.innerText = 'Add To List';
        this.form.appendChild(button);
        this.countries.all(this.addCountrySelect.bind(this));
        this.lists.all(this.addListSelect.bind(this));
        this.form.onsubmit = function(event) {
            event.preventDefault();
            var listName = event.target.list.value;
            var country = event.target.country.value;
            this.lists.find(event.target.list.value, function(list) {
               list.addItem(country);
                this.lists.update(listName, this.renderLists.bind(this));
            }.bind(this));
        }.bind(this);
    }
}

module.exports = UI;