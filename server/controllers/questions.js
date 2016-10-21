
var mongoose = require("mongoose");
var Question = mongoose.model("Question");

module.exports =
{
  // Get all the questions.
  index : function(req, res)
  {
    Question.find({}, function(err, questions)
    {
      if(err)
      {
        console.log("ERROR: " + err);
        res.json({ errors : err });
      }
      else
      {
        // Database query was successful. Send the result set on to the client.
        res.json({ questions: questions });
      }
    });
  },
  // Add a new question
  create : function(req, res)
  {
    console.log(req.body);
    var question = new Question(
      {
        // TODO: Add validation here for the text?
        text : req.body.text,
        description : req.body.description,
        _user : req.body.userID,
        answers : []
      });

    Question.create(question, function(err, question)
    {
      if(err)
      {
        console.log("ERROR: " + err);
        res.json({ errors : err });
      }
      else
      {
        // All good.
        res.json({ question: question });
      }
    });
  },
  // Get a specific question
  getQuestion : function(req, res)
  {
    // Show the requested question.
    Question.findById(req.params.id)
    .populate(
          {
            path : "answers",
            populate : { path : "_user" }
          }
        )
    .populate('_user')
    .exec(
      function(err, question)
      {
        if(err)
        {
          console.log("ERROR: " + err);
          res.json({ errors : err });
        }
        else
        {
          // Database query was successful.
          res.json({ question : question });
        }
      }
    );



    // Show the requested question.
    // Question.findById(req.params.id , function(err, question)
    // {
    //   if(err)
    //   {
    //     console.log("ERROR: " + err);
    //     res.json({ errors : err });
    //   }
    //   else
    //   {
    //     // Database query was successful.
    //     res.json({ question : question });
    //   }
    // }

  //);
  }
}
