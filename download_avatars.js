var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'BroodMeister';
var GITHUB_TOKEN = '52c5547c7546cce465087137e1411b4650507993';

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: 'https://'
      + GITHUB_USER + ':' + GITHUB_TOKEN
      + '@api.github.com/repos/'
      + repoOwner + '/' + repoName
      + '/contributors',

    headers: {
      'User-Agent': 'request'
    }
  }
  request.get(options)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('%s: %s', response.statusCode, response.statusMessage);
    });
}

console.log('Welcome to Github Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});