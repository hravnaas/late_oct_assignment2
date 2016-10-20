
var mongoose = require("mongoose");
var Answer = mongoose.model("Answer");
var Question = mongoose.model("Question");

module.exports =
{
  create : function(req, res)
  {
    // First find the question the answer is for.
    Question.findById(req.params.id, function(err, question)
    {
      if(err)
      {
        console.log("ERROR: " + err);
        res.json({ errors : err });
      }
      else
      {
        // We found the question the answer is for. Create an answer.
        var answer = new Answer(
          {
            text : req.body.text,
            _user : req.body.userID,
            _question : req.params.id,
            details : req.body.details,
            numLikes : 0
          }
        );
        // "Link" the answer to the question and user it's related to.
        question.answers.push(answer);
        answer.save(function(err)
        {
            if(err)
            {
              console.log("ERROR: " + err);
              res.json({ errors : err });
            }
            else
            {
              // We were able to save the answer.
              // Now attempt to update the question as well.
              question.save(function(err)
              {
                if(err)
                {
                  console.log("ERROR: " + err);
                  res.json({ errors : err });
                }
                else
                {
                  // Magically, everything worked.
                  // Return the answer to the caller.
                  res.json({ answer : req.body });
                }
              })
            }
        })
      }
  });
}
}
