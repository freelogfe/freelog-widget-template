const {serverOrigin} = require('./config');

const os = require('os');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');

const cookiesPath = path.resolve(os.homedir(), '.freelog/authInfo.json');

async function login() {
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: "Enter a freelog username: "
        },
        {
            type: 'password',
            message: 'Enter a freelog password',
            name: 'password',
        },
    ];

    let response;

    while (true) {
        const answers = await inquirer.prompt(questions);
        response = await axios.post(serverOrigin + '/v1/passport/login', {
            isRememer: 1,
            loginName: answers.username,
            password: answers.password,
        });

        if (response.data.ret === 0 && response.data.errcode === 0) {
            break;
        }

        console.log('Invalid username or password !!!');
    }

    console.log('Login successfull !');

    const cookies = response.headers['set-cookie'][0];

    const content = {
        cookies,
        userInfo: response.data.data,
    };

    const authInfoPath = path.resolve(os.homedir(), '.freelog/authInfo.json');
    fs.writeFileSync(authInfoPath, JSON.stringify(content, null, 2), 'utf-8');
    return content;
}

async function getCookies(forceLogin) {
    if (fs.existsSync(cookiesPath) && !forceLogin) {
        return JSON.parse(fs.readFileSync(cookiesPath, 'utf-8')).cookies;
    }

    const content = await login();
    return JSON.parse(content).cookies;
}

async function getUserInfo(forceLogin) {

    if (fs.existsSync(cookiesPath) && !forceLogin) {
        return JSON.parse(fs.readFileSync(cookiesPath, 'utf-8')).userInfo;
    }

    const content = await login();
    return JSON.parse(content).userInfo;
}

module.exports = {
    getUserInfo,
    getCookies,
    login,
};
