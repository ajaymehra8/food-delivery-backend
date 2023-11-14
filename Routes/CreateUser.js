const express = require("express");
const router = express.Router();
const app=express();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const jwtSecret="ibecamebestcoderbecamebestofallthim";
app.use(express.json());

router.post("/loginUser",
async (req, res) => {
    let email=req.body.email;

  try {
    let userData=await User.findOne({email});
    if(!userData){
return  res.status(422).json({ errors:"Try again" });
}

const pwdCompare=await bcrypt.compare(req.body.password,userData.password);
if(!pwdCompare){
    return  res.status(422).json({ errors:"Try again" });

}
const data={
  user:{
    id:userData.id
  }
}
const authToken=jwt.sign(data,jwtSecret);
return  res.json({ success:"true",authToken:authToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/createUser",[body('email').isEmail(),
body('password','incorrect password').isLength({min:5}),
body('name').isLength({min:5})],
async (req, res) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  const salt=await bcrypt.genSalt(10);
  let secPassword=await bcrypt.hash(req.body.password,salt);

  try {
    await User.create({
      
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location
    });

    res.send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
