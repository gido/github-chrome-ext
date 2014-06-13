// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Import the self API
var self = require("sdk/self");

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: "*.highrisehq.com",
  contentScriptFile: [
    self.data.url('jquery-1.11.1.min.js'),
    self.data.url('chosen/chosen.jquery.min.js'),
    self.data.url("contentscript.js")
  ],
  contentStyleFile: [
    self.data.url('chosen/chosen.css'),
    self.data.url('styles.css')
  ]
 });
