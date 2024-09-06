const Ajv = require("ajv");
const ajv = new Ajv();

const schema =  {
     "type": "object",
      "properties": {
            "title": {
                "type": "string",
                "minLength": 1,
            },
            "description": {  "type": "string" },
            "priority": {
                "type": "string",
                "enum" : ["low", "medium", "high"] ,
            },
            "dueDate": {
                "type": "string"
            }
        },
        "required": ["title"],
        "additionalProperties" : false,
};

const CreateValid = ajv.compile(schema);
module.exports = CreateValid;