const {serverOrigin} = require('./config');

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const request = require('request');

const {getCookies} = require('./get-auth-info');
const {projectPackage} = require('./config');

async function main() {
    const result = await uploadWidget('build/direflowBundle.js');
    if (result.isExistResource) {
        console.log('Widget already exists !');
        return result;
    }

    // const pkg = JSON.parse(fs.readFileSync('package.json'));
    const params = {
        aliasName: projectPackage.name,
        uploadFileId: result.uploadFileId,
    };

    const config = {
        headers: {
            'Cookie': await getCookies(),
        },
    };

    const {data} = await axios.post(serverOrigin + '/v1/resources', params, config);

    if (data.ret !== 0 || data.errcode !== 0) {
        throw new Error(data.ret.msg);
    }

    return data.data;

}

if (require.main === module) {
    main();
}

module.exports = main;

function uploadWidget(filePath) {
    return new Promise(async (resolve, reject) => {
        const options = {
            url: serverOrigin + '/v1/resources/temporaryFiles/uploadResourceFile',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': await getCookies(),
            },
            formData: {
                file: fs.createReadStream(filePath),
                resourceType: 'widget',
            },
        };

        request.post(options, function (err, res) {
            if (err) {
                reject(err);
                return;
            }

            const body = JSON.parse(res.body);
            if (body.ret !== 0 || body.errcode !== 0) {
                reject(body.msg);
                return;
            }
            resolve(body.data);
        });
    });
}

