const mongoose = require("mongoose");
const constants = require('../../constants');
const userModel = require('./userModel')
const userMaster = mongoose.model(constants.DB_MODEL_REF_NEW.USERS, userModel.UserSchema);
const appUtils = require('../../utils/appUtils');

let dao = require('../../dao/Basedao');
const userDao = new dao(userMaster);

const jwtHandler = require('../../handlers/jwtHandler');
const imageUpload = require("../../utils/imageUpload");



async function signIn(req) {

    let query = {
        usr_email: req.body.usr_email,
        usr_is_deleted: false,
    };

    return userDao.findOne(query).then(async (userDetails) => {
        if (userDetails && userDetails != null) {

            let isValidPassword = await appUtils.verifyPassword(req.body.usr_password, userDetails)

            if (!isValidPassword) {
                return 2;
            } else {
                let updateObj = {
                    usr_jwt: await generateToken(req.body)
                };
                return await userDao.findOneAndUpdate(query, { $set: updateObj }, { new: true });
            }
        } else {
            return 1;
        }
    });

}



async function generateToken(data) {

    let obj = {
        _id: data._id,
        _email: data.usr_email && data.usr_email != null ? data.usr_email : ''
    };
    return await jwtHandler.genUsrToken(obj).then(async (jwt) => {

        return await jwt;
    });

}


async function signUp(req) {
    let emailQuery = {
        usr_email: req.body.usr_email,
        usr_is_deleted: false,
    };

    const [emailData] = await Promise.all([
        userDao.findOne(emailQuery),
    ]);
    if (emailData && emailData != null) {
        return 1;
    } else {

        req.body.usr_password = await appUtils.generateSaltAndHashForPassword(req.body.usr_password);
        req.body.usr_jwt = await generateToken(req.body);

        return await userDao.save(req.body);
    }
}

async function signout(req) {

    let findUserQuery = {
        _id: mongoose.Types.ObjectId(req._id),
        usr_is_deleted: false,
    };

    let updateData = {
        $unset: {
            'usr_jwt': 1
        }
    };
    return await userDao.findOne(findUserQuery).then(async (data) => {
        if (data && data != null) {
            return await userDao.findByIdAndUpdate(findUserQuery, updateData).then(result => {
                if (result && result != null) {
                    return {};
                }
            })
        } else {
            return 1;
        }
    });
}

async function uploadData(req) {
    if (req.files == null) {
        return 3;
    } else {
        let updType = req.body.updType;
        if (req.files) {
            if (updType == 'image') {
                let reponseImg = await imageUpload.imageStoreOne(req.files.updDocs);
                return reponseImg;
            }
            else {
                return 2;
            }
        } else {
            return 1;
        }
    }
}

async function getDetailById(req) {
    let findQuery = {
        _id: mongoose.Types.ObjectId(req.params.id),
        usr_is_deleted: false,
    };

    return await userDao.findOne(findQuery).then(async (data) => {
        if (data && data != null) {
            return data
        } else {
            return 1;
        }
    });
}



async function edit(req) {
    let findQuery = {
        _id: mongoose.Types.ObjectId(req.params.id),
        usr_is_deleted: false,
    };

    return await userDao.findOne(findQuery).then(async (data) => {
        if (data && data != null) {

            let nameUniqueQuery = {
                $or: [
                    { usr_email: req.body.usr_email }
                ],
                _id: { $ne: mongoose.Types.ObjectId(req.params.id) }
            };

            let checkNameSymbol = await userDao.findOne(nameUniqueQuery);

            if (checkNameSymbol && checkNameSymbol != null) {
                return 2;
            }

            if(req.body.usr_password){
                req.body.usr_password = await appUtils.generateSaltAndHashForPassword(req.body.usr_password);
            }

            return await userDao.findOneAndUpdate(findQuery, { $set: req.body }, { new: true }).then(async (data) => {
                if (data) {
                    return data;
                }
            });



        } else {
            return 1;
        }
    });
}


module.exports = {
    signIn,
    signUp,
    signout,
    uploadData,
    getDetailById,
    edit
}