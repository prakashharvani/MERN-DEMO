const userService = require('./userService');
const resHandlr = require('../../handlers/responseHandler');
const constants = require('../../constants');
const userMsg = require('./userConstants');


function signIn(req) {
    return userService.signIn(req).then((data) => {
        if (data == 1) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.userNotFound, {});
        } else if (data == 2) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.passwordEmailMismatch, {});
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.signUpSuccess, data);
        }
    }).catch((error) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.InternalServerError, {})
    })
}

function signUp(req) {
    return userService.signUp(req).then((data) => {
        if (data == 1) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.userAlreadyExist, {});
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.signInSuccess, data);

        }
    }).catch((error) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.InternalServerError, {})
    })
}


function signout(req) {
    return userService.signout(req).then((result) => {
        if (result == 1) {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.dataNotFound, {})
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, constants.MESSAGES.logoutSuccessfully, {})
        }
    }).catch((error) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.InternalServerError, {})
    })
}


function uploadData(req) {
    return userService.uploadData(req).then((data) => {
        if (data == 3) {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.fileNotFound, {})
        } else if (data === 2) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.inValidType, {})
        } else if (data === 1) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.uploadErr, {})
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.uploadSuccess, data)
        }
    }).catch((er) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.uploadErr, {})
    })
}


function getDetailById(req) {
    return userService.getDetailById(req).then((data) => {
        if (data == 1) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.userNotFound, {});
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.getUserByIdSuccess, data)
        }
    }).catch((error) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.InternalServerError, {})
    })

}



function edit(req){
    return userService.edit(req).then((data) => {
        if (data == 1) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse,constants.MESSAGES.userNotFound, {});
        } else if(data == 2) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.userAlreadyExist, {});
        }else{
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.profileUpdateSuccess, data);
        }
    }).catch((error) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.InternalServerError, {})
    })
}

module.exports = {
    signIn,
    signUp,
    signout,
    getDetailById,
    uploadData,
    edit,

}