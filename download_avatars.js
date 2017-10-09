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
  var buff = '';
  request.get(options)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('%s: %s', response.statusCode, response.statusMessage);
    })
    .on('data', function(chunk) {
      buff += chunk;
    })
    .on('end', function() {
      callback(JSON.parse(buff));
    });
}

function loop(arr) {
  arr.forEach(function(element) {
    var filePath = './avatars/' + element.login + '.jpg'
    downloadImageByURL(element.avatar_url, filePath);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('%s: %s', response.statusCode, response.statusMessage);
    })
    .pipe(fs.createWriteStream(filePath));
}

function start() {
  if (!process.argv[2] || !process.argv[3]) {
    console.error('Please specify both repo owner and repo name');
    process.exit();
  }
  getRepoContributors(process.argv[2], process.argv[3], loop);
}

console.log('Welcome to Github Avatar Downloader!');
start();