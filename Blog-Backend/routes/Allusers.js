const router = require("express").Router();
const verify = require("./verifyToken");
const UserRelationship = require("../model/UserRelationship");
const User = require("../model/User");
const Blog = require("../model/Blog");

router.get("/relations", async (req, res, next) => {
  console.log("here - 1");
  const k = await UserRelationship.find({});
  res.json(k);
});

router.post("/sendrequest/:id", verify, async (req, res, next) => {
  const newrelation = new UserRelationship({
    Relating_user: req.user,
    Related_user: req.params.id,
    status: 0,
    //0 means request is sent but pending
    //1 means that both are friends
  });
  try {
    const savedRelation = await newrelation.save();
    res.send("request sent");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/cancelrequest/:id", verify, async (req, res, next) => {
  UserRelationship.deleteOne({Relating_user : req.user, Related_user : req.params.id}).then(function(){
    res.status(200).send('request cancelled')
  }).catch(function(error){
    res.status(400).send(error)
  });
});

router.patch("/acceptrequest/:id", verify, async (req, res, next) => {
  var updateObject = {status : '1'}; 
    var id = req.params.id;
    UserRelationship.updateOne({Relating_user  : req.user, Related_user : id}, {$set: updateObject})
    .then(()=>{
      res.send('request accepted');
  }).catch((err) =>{
    res.status(400).send(err)
  });
});

router.get("/otherusers", async (req, res, next) => {
  const id = "61ba64ff123201a308b29e74"
  var listt = []
  const allusers = await User.find({_id: {$ne : id}})

  const promises = allusers.map(async (el)=>{
    await UserRelationship.find({Relating_user: id, Related_user :el._id})
    .then((e)=>{
      //console.log()
      listt.push({
        user_id: el._id,
        user_name: el.name,
        status: e[0].status})
  })
    .catch((err)=>{
      listt.push({
        user_id: el._id,
        user_name: el.name,
        status: '-1'})
    })
  })

  //the function will stop here at this line till the variable 
  //'promises' has its complete values 
  const temp = await Promise.all(promises)

  //it will return all the users along the status 
  //code with the logged in user
  // -1 --> No link No friends
  // 0 --> request sent but pending yet
  // 1 --> both are friends
  res.json(listt)

});


module.exports = router;
