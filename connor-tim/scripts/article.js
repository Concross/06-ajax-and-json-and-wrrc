'use strict';

function Article(rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// REVIEW: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

// COMMENT: Why isn't this method written as an arrow function?
// Because we need to maintain the contextual this.
Article.prototype.toHtml = function () {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);

  // COMMENT: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // This is a ternary operator that represents an if/else statement. The code on the left of the ':' is executed if the statement before the '?' is true, otherwise the code on the right of the ':' is executed.
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEW: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEW: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENT: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// This function is called within the Article.fetchAll function. 'rawData' at this point represents the hackerIpsum.json data file. In past labs, the rawData JSON was assigned to a specific variable in a js file.
Article.loadAll = articleData => {
  articleData.sort((a, b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  articleData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// DONE: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // REVIEW: What is this 'if' statement checking for? Where was the rawData set to local storage?
  $.ajax({
    type: "HEAD",
    url: '../data/hackerIpsum.json',
    complete: function (XMLHttpRequest) {
      if (!localStorage.eTag) {
        localStorage.eTag = JSON.stringify(XMLHttpRequest.getResponseHeader('eTag'));
      } else {
        if (JSON.parse(localStorage.eTag) !== XMLHttpRequest.getResponseHeader('eTag').toString()) {
          $('article').remove();
          Article.all = [];
          localStorage.removeItem('rawData');
          localStorage.eTag = JSON.stringify(XMLHttpRequest.getResponseHeader('eTag'));
          Article.fetchAll();
        }
      }
    },
  });

  if (localStorage.rawData) {
    Article.loadAll(JSON.parse(localStorage.rawData));
    articleView.initIndexPage();
  } else {
    $.getJSON('../data/hackerIpsum.json', function (rawData) {
      Article.loadAll(rawData);
      articleView.initIndexPage();
      localStorage.rawData = JSON.stringify(rawData);
    })
  }
}
