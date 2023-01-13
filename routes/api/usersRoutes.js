const router = require('express').Router();
const {
    getAllusers,
    getUserbyid,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')