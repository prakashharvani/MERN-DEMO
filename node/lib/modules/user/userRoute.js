const usrRoutr = require("express").Router();
const validators = require('./userValidator');
const usrFacade = require('./userFacade');
const resHndlr = require("../../handlers/responseHandler");
const jwtHandler = require('../../handlers/jwtHandler');


usrRoutr.route('/signIn')
  .post([validators.validateSignInData], (req, res) => {
    usrFacade.signIn(req, res).then((result) => {
      resHndlr.sendSuccess(res, result)
    }).catch((err) => {
      resHndlr.sendError(res, err)
    })
  })

usrRoutr.route('/signUp')
  .post([validators.validateSignUpData], (req, res) => {
    usrFacade.signUp(req, res).then((result) => {
      resHndlr.sendSuccess(res, result)
    }).catch((err) => {
      resHndlr.sendError(res, err)
    })
  })

usrRoutr.route('/signout')
  .get([jwtHandler.verifyUsrToken], (req, res) => {
    usrFacade.signout(req, res).then(result => {
      resHndlr.sendSuccess(res, result)
    }).catch(err => {
      resHndlr.sendError(res, err)
    })
  })

usrRoutr.route('/uploadData')
  .post([], (req, res) => {
    usrFacade.uploadData(req, res).then((result) => {
      resHndlr.sendSuccess(res, result)
    }).catch((err) => {
      resHndlr.sendError(res, err)
    })
  })


usrRoutr.route('/detail/:id').get([jwtHandler.verifyUsrToken,validators.validateId], (req, res) => {

  usrFacade.getDetailById(req, res).then(result => {
    resHndlr.sendSuccess(res, result)
  }).catch(err => {
    resHndlr.sendError(res, err)
  })
})

usrRoutr.route('/edit/:id')
.put([jwtHandler.verifyUsrToken,validators.validateId], (req, res) => {
  usrFacade.edit(req, res).then((result) => {
    resHndlr.sendSuccess(res, result)
  }).catch((err) => {
    resHndlr.sendError(res, err)
  })
})

module.exports = usrRoutr