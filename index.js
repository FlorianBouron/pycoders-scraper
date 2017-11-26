var casper = require('casper').create({
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
  },
  clientScripts: ['vendor/jquery.js', 'vendor/lodash.js']
});

var fs = require('fs');
var url = 'http://pycoders.com/archive/';

var link = [];
var title = [];
var date = [];
var output = [];

function outputJSON() {
  for(var i=0; i<link.length; i++) {
    output.push({
      link: link[i],
      title: title[i],
      date: date[i]
    });
  }
  return JSON.stringify(output);
}

function getLink() {
  var link = $('.campaign a');
  return _.map(link, function(e) {
    return e.getAttribute('href');
  });
}

function getTitle() {
  var title = $('.campaign a');
  return _.map(title, function(e) {
    return e.innerHTML.replace(/:.*$/g, "");
  });
}

function getDate() {
  var date = $('.campaign');
  return _.map(date, function(e) {
    return e.innerText.replace(/-.*$/g, "");;
  });
}

casper.start(url, function() {

});

casper.then(function() {
  link = this.evaluate(getLink);
});

casper.then(function() {
  title = this.evaluate(getTitle);
});

casper.then(function() {
  date = this.evaluate(getDate);
});

casper.run(function() {
  var data = outputJSON();
  fs.write('data.json', data, 'w');
  this.echo("\n Execution terminated").exit();
});

