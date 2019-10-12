const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String, // validation for email probably, unique
  password: String, // required
  linkedinId: String,

  reports: [{
    summary: { type: String },
    note: String,
    title: String,
    word_count: { type: Number },
    Word_count_message: { type: String },
    processed_language: { type: String },
    personality: [
      {
        trait_id: { type: String },
        name: { type: String },
        category: { type: String },
        percentile: { type: Number },
        significant: { type: Boolean },
        children: [
          {
            trait_id: { type: String },
            name: { type: String },
            category: { type: String },
            percentile: { type: Number },
            significant: { type: Boolean }
          }
        ]

      }
    ],
    needs: [
      {
        trait_id: { type: String },
        name: { type: String },
        category: { type: String },
        percentile: { type: Number },
        significant: { type: Boolean }
      }
    ],
    values: [
      {
        trait_id: { type: String },
        name: { type: String },
        category: { type: String },
        percentile: { type: Number },
        significant: { type: Boolean }
      },
    ],
  }],
},
  {
    timestamps: true
  });

module.exports = mongoose.model("User", userSchema);