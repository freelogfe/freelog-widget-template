const fs = require('fs');
const axios = require('axios');

const {getUserInfo, getCookies} = require('./get-auth-info');
const {serverOrigin, projectPackage} = require('./config');
const uploadResource = require('./upload-resource');

async function init() {
    const userInfo = await getUserInfo();

    const releaseName = userInfo.username + '/' + projectPackage.name;

    const config = {
        params: {
            releaseName,
        },
        headers: {
            'Cookie': await getCookies(),
        },
    };

    const {data} = await axios.get(serverOrigin + '/v1/releases/detail', config);
    if (data.data) {
        await updateRelease(data.data.releaseId);
        console.log('Update release successfull !')
    } else {
        await newRelease();
        console.log('Create release successfull !')
    }

}

init();

async function newRelease() {
    // console.log('******');
    const resource = await uploadResource();
    // console.log(resource, 'resource');

    const params = {
        resourceId: resource.resourceId || resource.sha1,
        releaseName: projectPackage.name,
        version: projectPackage.version,
        baseUpcastReleases: [],
        resolveReleases: [],
    };

    const config = {
        headers: {
            'Cookie': await getCookies(),
        },
    };

    const {data} = await axios.post(serverOrigin + '/v1/releases', params, config);

    if (data.ret !== 0 || data.errcode !== 0) {
        throw new Error(data.ret.msg);
    }

    return data.data;
}

async function updateRelease(releaseId) {
    const resource = await uploadResource();
    console.log(resource, releaseId);
    const params = {
        resourceId: resource.resourceId || resource.sha1,
        version: projectPackage.version,
        resolveReleases: [],
    };
    const config = {
        headers: {
            'Cookie': await getCookies(),
        },
    };

    const {data} = await axios.post(serverOrigin + `/v1/releases/${releaseId}/versions`, params, config);

    if (data.ret !== 0 || data.errcode !== 0) {
        throw new Error(data.ret.msg);
    }

    return data.data;

}