
var mongoose = require("mongoose");
var UserBasic = mongoose.model("UserBasic");

module.exports =
{
  login : function(req, res)
  {
    UserBasic.findOne( { name : req.body.name }, function(err, user){
      if(err)
      {
        console.log("ERROR: " + err);
        req.session.destroy();
        res.json({ errors : err });
      }
      else if(user == undefined)
      {
        // Add a new user.
        UserBasic.create(req.body, function(err, user)
        {
          if(err)
          {
            req.session.destroy();
            console.log("ERROR: " + err);
            res.json({ errors : err });
          }
          else
          {
            // All good. Return the new user to the caller.
            req.session.user = user;
            req.session.save();
            res.json({ user : user });
          }
        });
      }
      else
      {
        req.session.user = user;
        req.session.save();
        res.json({ user : user });
      }
    });
  },
  logout : function(req, res)
  {
    req.session.destroy();
    res.json({ user : null });
  },
  // Indicates whether a user is logged in by either returning
  // a valid user object or returning null meaning no one is logged in.
  getLoggedInUser : function(req, res)
  {
    if(req.session.user)
      res.json({ user : req.session.user });
    else
      res.json({ user: null });
  }
}
