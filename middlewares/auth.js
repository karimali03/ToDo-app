const jwt = require('jsonwebtoken');

class Authentication {
  static loginAuth =  (req,res,next) => {
        const token = req.headers['x-auth-token'];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded._id;
            next(); 
        } catch (error) {
            return res.status(400).send({
                message: "Invalid Token"
            });
        }
  }

  static adminAuth = (req,res,next) => {
        const token = req.headers['x-auth-token'];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded.isAdmin !== true && decoded._id !== req.params.id ) return res.status(401).send({
                message: "Unauthorized"
            });
            req.userId = decoded._id;
            next(); 
        } catch (error) {
            return res.status(400).send({
                message: "Invalid Token"
            });
        }
  }

    static userAuth = (req,res,next) => {
        const token = req.headers['x-auth-token'];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded.isAdmin !== true ) return res.status(401).send({
                message: "Unauthorized"
            });
            req.userId = decoded._id;
            next(); 
        } catch (error) {
            return res.status(400).send({
                message: "Invalid Token"
            });
        }
    }

   
}


module.exports = Authentication;
