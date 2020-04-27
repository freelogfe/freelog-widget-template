const axios = require('axios');
const fs = require('fs');

(async () => {

    const {data: templateString} = await axios.get('http://test-frcdn.oss-cn-shenzhen.aliyuncs.com/pagebuild/index.html');


    // const html = templateString.replace('<!-- Theme template placeholder -->', `<%= require('html-loader!./them-template.html') %>`);
    const html = templateString.replace(/(?<=<div id="js-page-container">)[\s\S]*?(?=<\/div>)/, `<%= require('html-loader!./them-template.html') %>`);

    if (!fs.existsSync('public') || fs.statSync('public').isFile()) {
        fs.mkdirSync('public');
    }

    fs.writeFileSync('public/index.html', html, 'utf-8');

})();