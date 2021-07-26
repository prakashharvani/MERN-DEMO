








const http_code = {
    created: 201,
    ok: 200,
    unAuthorized: 401,
    account_not_found: 302,
    dataNotFound: 404,
    forbidden: 403,
    badRequest: 400,
    internalServerError: 500,
    anotherDevice: 208
}

const DB_MODEL_REF_NEW = {
    USERS: 'test_user',

}

const LOOKUP_REF_NEW = {
    USERS: 'test_users'
}

const MESSAGES = {
    userNotFound: "User not found.",
    passwordEmailMismatch: "Email or Password is incorrect.",
    InternalServerError: "Internal server error.",
    userAlreadyExist: 'User is already exist with the same email id or password.',
    dataNotFound: "Data not found.",
    logoutSuccessfully: "Signout Successfully.",
    getUserByIdSuccess:'Get user by id successfully.',
    invalidToken: "Invalid access token.",
    unAuthAccess: "Unauthorized access ",
    statusTrue: true,
    statusFalse: false,

    invalidEmail: "Please enter valid Email Address.",
    emailCantEmpty: "Please enter Email Address",
    passCantEmpty: "Password can't be empty",
    invalidPassword: 'Please enter valid Password. ex.Test@123',
    emptyId: 'Please enter id.',
    invalidId: 'Please enter valid id.',
}

module.exports = Object.freeze({
    http_code,
    TOKEN_EXPIRATION_TIME: 24 * 60, // in mins - 60

    DB_MODEL_REF_NEW,
    LOOKUP_REF_NEW,

    MESSAGES,

});