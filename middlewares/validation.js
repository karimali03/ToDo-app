const validCreate = require('../util/valid.create');
const validUpdate = require('../util/valid.update');

class valadationTask{
    
    static validationId = (req,res,next,id) => {
        const validID = /^[0-9a-fA-F]{24}$/;
        if(validID.test(id)){
            req.id = id;
            next();
        }
        else res.status(400).send({
            message: "Invalid Id"
        });
    }
    
    static validationCreate = (req,res,next) => {
        const isValid = validCreate(req.body);
        if(!isValid){
            res.status(400).send(validCreate.errors);
            return;
        }
        next();
    }
    
    static validationUpdate = (req,res,next) => {
        const isValid = validUpdate(req.body);
        if(!isValid){
            res.status(400).send(validUpdate.errors);
            return;
        }
        next();
    }
    
}

module.exports = valadationTask;