const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require('../SecretKey')

const { registration_validation } = require("../validation");

// Register User
router.post("/register", async (req, res) => {
  console.log('inside registration');
  console.log(req.body)
  //Validate before putting a user
  const { error } = registration_validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("Error occured here is");
  //checking the repeatition of the email
  const Email_exist = await User.findOne({ email: req.body.email });
  if (Email_exist) return res.status(400).send("Email already registered");
  //Do hashing over the password
  const salt = await bcrypt.genSalt(10);
  const Hashed_pass = await bcrypt.hash(req.body.password, salt);
  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: Hashed_pass,
  });
  try {
    //saved the new user to database
    const savedUser = await user.save();
    res.send({ name: user.name });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //find user with given email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not registered");

  const valid_pass = await bcrypt.compare(req.body.password, user.password);
  if (!valid_pass) return res.status(400).send("Invalid Password");

  //Create token for logged in user
  const token = jwt.sign({ _id: user._id }, secret);
  //authenticated and token sent 


  res.status(200).send({token:token, name:user.name});


});

module.exports = router;
