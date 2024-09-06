const validCreate = require('../util/validCreate');
const validUpdate = require('../util/validUpdate');

class valadationTask{
    
    static validationId = (req,res,next,id) => {
        let ID = +id;
        if(isNaN(ID) || ID < 0){
            res.status(400).send("Invalid Id");
            return;
        }
        req.id = ID;
        next();
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