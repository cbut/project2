const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String, // validation for email probably, unique
  password: String, // required
  reports: [{
  "word_count": {
    "type": "Number"
  },
  "word_count_message": {
    "type": "String"
  },
  "processed_language": {
    "type": "String"
  },
    {
    "personality":[
      "trait_id": {
        "type": "String"
      },
      "name": {
        "type": "String"
      },
      "category": {
        "type": "String"
      },
      "percentile": {
        "type": "Number"
      },
      "significant": {
        "type": "Boolean"
      }, "children": [
        {
      "trait_id": {
        "type": "String"
      },
      "name": {
        "type": "String"
      },
      "category": {
        "type": "String"
      },
      "percentile": {
        "type": "Number"
      },
      "significant": {
        "type": "Boolean"
      }
  }
    ]
  }
    ],
  "needs":[],
  "values": [], 
  "warnings": []
  ]
}, {
    timestamps: true
  });

module.exports = mongoose.model("User", userSchema);