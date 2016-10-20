
var mongoose = require('mongoose');

// Create the user (basic) schema
//var Schema = mongoose.Schema; if using associations!!!
var UserBasicSchema = new mongoose.Schema(
  {
    name :{
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 50
          }
  },
  {
    timestamps: true
  }
);

// Register the schema as a model.
var UserBasic = mongoose.model('UserBasic', UserBasicSchema);
