const Ajv = require("ajv");
const ajv = new Ajv();

const schema =  {
     "type": "object",
      "properties": {
            "email": {  
                "type": "string"
            },
            "password": {
                "type": "string",
                "minLength": 6
            }
        },
        "required": ["email", "password"],
        "additionalProperties" : false,
};

const loginValid = ajv.compile(schema);
module.exports = loginValid;