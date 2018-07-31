# AJAX and JSON

**Author**: Connor and Tim
**Version**: 1.4.0

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->
We are building a blog that can add articles that can be filtered by author and category.  It also has a navbar which uses SPA design. It requests articles from a json file and renders new changes as they are made.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

The user needs to scaffold out the HTML with a nav and template articles. Then the user needs to setup some basic CSS for the nav, footer and template article.  Then the user needs to setup and article Constructor Object from database.  Then the user needs to add filters for author name and category and populate them.  Then the user needs to hide and show articles according to filter.  Then the user needs to create nav functionality that shows/hides parts of the page. The user will also need to have a JSON file with article data and and understanding of AJAX requests.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

Languages: JS, CSS/HTML
Libraries: jQuery, Marked.js, Highlight.js
Strategies: AJAX, SMACSS

## Change Log
<!-- Use this are to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples: -->

07-26-18 8:00am - Initial commit with copied folder from starter
07-26-18 8:30am - Completed review of existing code base
07-26-18 10:00am - Added functionality to Article.fetchAll() to fetch articles from JSON file and render them to index.html
07-26-18 12:30am - Added new ajax request to update index.html with changes to JSON file containing our article data

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. --> Connor Crossley and Tim Leavey
