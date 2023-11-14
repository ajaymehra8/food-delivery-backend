const express = require("express");
const router = express.Router();
const app=express();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

app.use(express.json());
router.post("/loginUser",
async (req, res) => {
    let email=req.body.email;

  try {
    let userData=await User.findOne({email});
    if(!userData){
return  res.status(422).json({ errors:"Try again" });
}

if(!req.body.password===userData.password){
    return  res.status(422).json({ errors:"Try again" });

}
return  res.json({ success:"true" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
