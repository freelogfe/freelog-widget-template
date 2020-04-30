const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const request = require('request');
const crypto = require('crypto');

const {getCookies, getUserInfo} = require('./get-auth-info');
const {serverOrigin, projectPackage, colorLog} = require('./config');


async function main() {

    const fileSha1 = getFileSha1(projectPackage.main);
    const {data: resource} = await axios.get(serverOrigin + '/v1/resources/' + fileSha1, {
        headers: {
            'Cookie': await getCookies(),
        },
    });

    if (resource.ret !== 0 || resource.errcode !== 0) {
        colorLog.error(JSON.stringify(resource.msg, null, 2));
        return null;
    }

    if (resource.data) {

        const userInfo = await getUserInfo();
        if (userInfo.userId === resource.data.userId) {
            colorLog.success('Widget already uploaded !');
            return resource.data;
        }

        colorLog.error('Widget already exists !');
        return null;
    }

    // console.log('######');
    const result = await uploadWidget(projectPackage.main);
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
        colorLog.error(JSON.stringify(data.msg, null, 2));
        return null;
    }

    colorLog.success('Create resource successfull !');
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

function getFileSha1(filePath) {
    const hash = crypto.createHash('sha1');
    const str = fs.readFileSync(filePath);
    hash.update(str);
    return hash.digest('hex');
}
