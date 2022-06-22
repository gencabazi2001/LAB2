
const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const ormRelation = require("../orm/relationsOrm");
const dto = require("../DTO/index")
const { response } = require("express");


  exports.AddFollow = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.AddFollowDTO = req.body;
            respOrm = await ormRelation.AddFollow(dto.AddFollowDTO);
            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User Updated', statusCode = enum_.CODE_CREATED;
                Object.assign(data,{FollowAdded:"True"})
            }

        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }


  exports.AddBlock = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data={}, statusCode=0, resp={};
    let respOrm;
    try{
          dto.AddBlockDTO = req.body;
            respOrm = await ormRelation.AddBlock(dto.AddBlockDTO);
            if(respOrm != true){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User Updated', statusCode = enum_.CODE_CREATED;
                Object.assign(data,{FollowAdded:"True"})
            }

        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
  }


