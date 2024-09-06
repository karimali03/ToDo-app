
module.exports = (res , req , next , val) =>{
    let id = val;
    console.log("id",id);
    id = +id;
    if(isNaN(id)){
        res.status(400).send("Invalid Id");
        return;
    }
    req.id = id;
    next();
}
