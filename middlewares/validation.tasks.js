const CreateTaskValid = require('../util/valid.create.task');
const validUpdateTask = require('../util/valid.update.task');

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
        const isValid = CreateTaskValid(req.body);
        if(!isValid){
            res.status(400).send(CreateTaskValid.errors);
            return;
        }
        next();
    }
    
    static validationUpdate = (req,res,next) => {
        const isValid = validUpdateTask(req.body);
        if(!isValid){
            res.status(400).send(validUpdateTask.errors);
            return;
        }
        next();
    }
    
}

module.exports = valadationTask;