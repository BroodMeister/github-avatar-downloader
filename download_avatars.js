var request = require('request');
var fs = require('fs');
var dir = '../avatars/';

var GITHUB_USER = 'BroodMeister';
var GITHUB_TOKEN = '52c5547c7546cce465087137e1411b4650507993';

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: 'https://'
      + GITHUB_USER + ':' + GITHUB_TOKEN
      + '@api.github.com/repos/'
      + repoOwner + '/' + repoName
      + '/contributors',
    headers: { 'User-Agent': 'request' }
  }
  var buff = '';
  request.get(options)
    .on('error', function(err) {
      console.error(err);
      process.exit();
    })
    .on('data', function(chunk) {
      buff += chunk;
    })
    .on('end', function() {
      callback(JSON.parse(buff));
    });
}

function downloadImageByURL(url, filePath) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  request.get(url)
    .on('error', function(err) {
      console.error(err);
      process.exit();
    })
    .pipe(fs.createWriteStream(filePath));
}

function loop(arr) {
  arr.forEach(function(obj) {
    var filePath = dir + obj.login + '.jpg'
    downloadImageByURL(obj.avatar_url, filePath);
  });
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