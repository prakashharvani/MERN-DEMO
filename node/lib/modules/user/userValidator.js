const constants = require('./../../constants');
const moduleMsg = require('./userConstants');
const joi = require('joi');
// Validate User Request
const resHndlr = require("../../handlers/responseHandler");



/**for validation error handler */
function validationErrorHandler(res, error) {
    console.log('User Module ErrorLog : ', error); // Dont remove this line of console.
    resHndlr.sendError(res, resHndlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, error.details ? error.details[0].message : 'There is some issue in validation.', {}));
}


async function validateSignInData(req, res, next) {
    try {
        // create schema for email validation
        let obj = {
            usr_email: joi.string().required().pattern(/^[A-Za-z\d\.\_\-\+]{2,64}\@([A-Za-z\d\-\_]{1,256})\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/).empty()
                .messages({
                    'string.empty': constants.MESSAGES.emailCantEmpty,
                    'any.required': constants.MESSAGES.emailCantEmpty,
                    'string.pattern.base': constants.MESSAGES.invalidEmail,
                }),
            usr_password: joi.string().required().empty().pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)
                .messages({
                    'string.empty': constants.MESSAGES.passCantEmpty,
                    'any.required': constants.MESSAGES.passCantEmpty,
                    'string.pattern.base': constants.MESSAGES.invalidPassword,
                })
        }

        const schema = joi.object(obj);
        await schema.validateAsync(req.body, { allowUnknown: true });
        next();

    } catch (error) {
        validationErrorHandler(res, error);
    }
}



async function validateSignUpData(req, res, next) {
    try {
        // create schema for email validation
        let obj = {
            usr_email: joi.string().required().pattern(/^[A-Za-z\d\.\_\-\+]{2,64}\@([A-Za-z\d\-\_]{1,256})\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/).empty()
                .messages({
                    'string.empty': constants.MESSAGES.emailCantEmpty,
                    'any.required': constants.MESSAGES.emailCantEmpty,
                    'string.pattern.base': constants.MESSAGES.invalidEmail,
                }),
            usr_password: joi.string().required().empty().pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)
                .messages({
                    'string.empty': constants.MESSAGES.passCantEmpty,
                    'any.required': constants.MESSAGES.passCantEmpty,
                    'string.pattern.base': constants.MESSAGES.invalidPassword,
                }),
            usr_image: joi.string().required().empty()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.userImageRequired,
                    'any.required': moduleMsg.MESSAGES.userImageRequired
                }),
            usr_dob: joi.string().required().empty()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.userDOBRequired,
                    'any.required': moduleMsg.MESSAGES.userDOBRequired
                }),
            usr_firstname: joi.string().required().empty()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.firstnameRequired,
                    'any.required': moduleMsg.MESSAGES.firstnameRequired
                }),
        }

        const schema = joi.object(obj);
        await schema.validateAsync(req.body, { allowUnknown: true });
        next();

    } catch (error) {
        validationErrorHandler(res, error);
    }
}


/** check mongoose ObjectId is valid */
async function validateId(req, res, next) {
    try {
        // create schema for id parameter
        const schema = joi.object({
            id: joi.string().length(24).required()
                .messages({
                    'string.length': constants.MESSAGES.invalidId,
                    'string.empty': constants.MESSAGES.emptyId,
                    'any.required': constants.MESSAGES.emptyId
                })
        });
        await schema.validateAsync(req.params, { allowUnknown: true })
        next();
    } catch (error) {
        validationErrorHandler(res, error);
    }
}



module.exports = {
    validateSignInData,
    validateSignUpData,
    validateId,
    

}