const fs = require('fs');


exports.serverOrigin = 'http://qi.testfreelog.com';

exports.aliyuncsPagebuildUrl = 'http://test-frcdn.oss-cn-shenzhen.aliyuncs.com/pagebuild/index.html';


exports.projectPackage = JSON.parse(fs.readFileSync('package.json'));