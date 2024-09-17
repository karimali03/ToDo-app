const Ajv = require("ajv");
const ajv = new Ajv();

const schema =  {
     "type": "object",
      "properties": {
            "username": {
                "type": "string",
                "minLength": 5,
            },
            "email": {  
                "type": "string"
            },
            "password": {
                "type": "string",
                "minLength": 6
            }
        },
        "minProperties": 1,
        "additionalProperties" : false,
};

const updateUserValid = ajv.compile(schema);
module.exports = updateUserValid;