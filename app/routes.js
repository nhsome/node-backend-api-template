'use strict'

const Roles = require('./Roles.js');
const ALL_ROLES = Roles.getAll();

module.exports = [
    //Main
    {
        path: '/whoami',
        method: 'get',
        controller: 'Main',
        action: 'showThisUser',
        accessible: ALL_ROLES,
    },
    //Auth
    {
        path: '/login',
        method: 'post',
        controller: 'Auth',
        action: 'authVerify',
        accessible: [],
    },
    // //Show users
    // {
    //     path: '/users',
    //     method: 'get',
    //     controller: 'Users',
    //     action: 'showData',
    //     accessible: ['ADMIN'],
    // },
    // //Add users
    // {
    //     path: '/user',
    //     method: 'post',
    //     controller: 'Users',
    //     action: 'addData',
    //     accessible: ['ADMIN'],
    // },
    // //Update users
    // {
    //     path: '/user/:id',
    //     method: 'put',
    //     controller: 'Users',
    //     action: 'updateData',
    //     accessible: ['ADMIN'],
    // },
    // //Archive users
    // {
    //     path: '/user/:id',
    //     method: 'patch',
    //     controller: 'Users',
    //     action: 'archiveData',
    //     accessible: ['ADMIN'],
    // },
];