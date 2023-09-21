const User = require('../models/user')


//login User
exports.loginUser = async (req, res) => {
  res.json({
    messg: "login User",
  });
};

//signup User
exports.signUp = async (req,res) => {
    res.json({
        messg : "sign User"
    })
}


