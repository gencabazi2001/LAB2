
const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const ormUser = require("../orm/orm");
const dto = require("../DTO/index")
const {registerValidation} = require("../services/validation")
const {securePassword,validPassword} = require("../services/securePassword");
const {token} = require("../services/sign-token")
const { response } = require("express");

exports.Login = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
        let myToken = ""
          dto.LoginDTO = req.body;
            respOrm = await ormUser.Login(dto.LoginDTO.Email);
            const isValid = await validPassword(req.body.Password, respOrm.Password );
            myToken = await token(respOrm.ID,respOrm.Email,respOrm.Username,respOrm.Name)
            console.log(myToken)
            if(!isValid){
                status = 'Failure', errorCode = '401', message ="unauthorized", statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User created', statusCode = enum_.CODE_CREATED;
                Object.assign(data,{myToken})
            }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }


exports.Register = async (req, res) =>{
  let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
  let respOrm;
  try{
        const error = registerValidation(req.body)
      if(error.error == undefined){
        dto.StoreDTO = req.body;
        dto.StoreDTO.Password = await securePassword(req.body.Password);
          respOrm = await ormUser.Register(dto.StoreDTO);
          if(respOrm.err){
              status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
          }else{
              message = 'User created', statusCode = enum_.CODE_CREATED;
              Object.assign(data,dto.StoreDTO)
          }
      }else{
          status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = error.error.details, statusCode = enum_.CODE_BAD_REQUEST;
      }
      resp = await magic.ResponseService(status,errorCode,message,data)
      return res.status(statusCode).send(resp);
  } catch(err) {
      console.log("err = ", err);
      return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
  }
}


exports.GetUsers = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{   
            respOrm = await ormUser.GetUsers();
            console.log(respOrm)
            if(respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else{
                message = 'User Found', statusCode = enum_.CODE_FOUND;
                
                Object.assign(data,{respOrm})
             
            }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }
  


exports.GetUser = async (req, res) =>{
  let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
  let respOrm;
  try{
        dto.UserIDDTO = req.params;
        console.log(dto.UserIDDTO)
          respOrm = await ormUser.GetUser(dto.UserIDDTO);
          if(respOrm.err){
              status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
          }else{
              message = 'User Found', statusCode = enum_.CODE_FOUND;
              Object.assign(data,respOrm)
           
          }
      resp = await magic.ResponseService(status,errorCode,message,data)
      return res.status(statusCode).send(resp);
  } catch(err) {
      console.log("err = ", err);
      return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
  }
}


exports.AddDetails = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.AddDetailsDTO = req.body;
            respOrm = await ormUser.AddDetails(dto.AddDetailsDTO);

            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User Updated', statusCode = enum_.CODE_CREATED;
                Object.assign(data,dto.AddDetailsDTO)
            }
            // status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = "error", statusCode = enum_.CODE_BAD_REQUEST;
        
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }

  exports.AddSettings = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.AddSettingsDTO = req.body;
            respOrm = await ormUser.AddSettings(dto.AddSettingsDTO);

            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User Updated', statusCode = enum_.CODE_CREATED;
                Object.assign(data,dto.AddSettingsDTO)
            }
            // status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = "error", statusCode = enum_.CODE_BAD_REQUEST;
        
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }

  exports.AddTag = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.AddPreferenceDTO = req.body;
            respOrm = await ormUser.AddTag(dto.AddPreferenceDTO);

            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User Updated', statusCode = enum_.CODE_CREATED;
                Object.assign(data,{TagAdded:"True"})
            }

        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }

  exports.PromoteUser = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.UserIDDTO = req.body;
            respOrm = await ormUser.PromoteUser(dto.UserIDDTO);

            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User Promoted', statusCode = enum_.CODE_CREATED;
                Object.assign(data,{Promoted:"True"})
            }

        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }

  exports.TerminateUser = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.TerminateUserDTO = req.body;
            respOrm = await ormUser.TerminateUser(dto.TerminateUserDTO);

            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = ' User Terminated', statusCode = enum_.CODE_CREATED;
                Object.assign(data,{Terminated:"True"})
            }

        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }

  exports.VerifyUser = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.UserIDDTO = req.body;
            respOrm = await ormUser.VerifyUser(dto.UserIDDTO);
            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = ' User Verifies', statusCode = enum_.CODE_CREATED;
                Object.assign(data,{Verified:"True"})
            }

        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }


