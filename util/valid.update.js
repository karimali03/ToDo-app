const Ajv = require("ajv");
const ajv = new Ajv();

const schema =  {
     "type": "object",
      "properties": {
            "id": { "type": "number" },
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
        "additionalProperties" : false,
};

const validUpdate = ajv.compile(schema);
module.exports = validUpdate;