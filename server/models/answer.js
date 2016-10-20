
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the schema
var AnswerSchema = new mongoose.Schema(
  {
    text :{
            type: String,
            required: [true, "An answer is required and must be at least 5 characters long."],
            minlength: 5
          },
    _user : { type : Schema.Types.ObjectId, ref: "UserBasic" },
    _question : { type : Schema.Types.ObjectId, ref: "Question" },
    details : String,
    numLikes : { type : Number, default : 0 }
  }
);

// Register the schema as a model.
var Answer = mongoose.model('Answer', AnswerSchema);
