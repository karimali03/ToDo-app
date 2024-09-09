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
        "required": ["username", "email", "password"],
        "additionalProperties" : false,
};

const signupValid = ajv.compile(schema);
module.exports = signupValid;