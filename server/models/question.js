
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the schema
var QuestionSchema = new mongoose.Schema(
  {
    text :{
            type: String,
            required: [true, "Question is required and must be at least 10 characters long."],
            minlength: 10
          },
    _user : { type : Schema.Types.ObjectId, ref: "UserBasic" },
    answers : [{ type : Schema.Types.ObjectId, ref: "Answer" } ],
    description : String
  }
);

// Register the schema as a model.
var Question = mongoose.model('Question', QuestionSchema);
