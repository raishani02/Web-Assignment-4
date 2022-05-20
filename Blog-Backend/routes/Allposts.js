const router = require("express").Router();
const verify = require('./verifyToken');
const User = require("../model/User");
const Blog = require("../model/Blog");

router.get('/',verify, async(req,res,next) =>{
    
    Blog.find({},(a,b)=>{
        if(a){
            console.log("a", a)
            res.status(400).send(a)
        }
        else{
            res.status(200).json(b)
        }
    }).populate('user_id', 'name')
})

router.get('/myposts', verify, async(req,res,next) =>{

    var posts = await Blog.find({user_id: req.user}).populate('user_id', 'name');
    res.json(posts);

})

router.get('/specpost', async(req,res,next) =>{
    var posts = await Blog.findOne({_id: req.query.postId});
    res.json(posts);

})

router.patch('/updatepost',verify, async(req,res,next) =>{
    
    Blog.findByIdAndUpdate({
        _id:req.body._id
    },{
        $set:req.body
    }).then(()=>{
        res.send({message:"success"});
    });
})

router.delete('/deletepost',verify ,async(req,res,next) =>{
    try
    {
        Blog.deleteOne({_id : req.body.id}).then(function(){
        }).catch(function(error){
        });
        res.status(200).send("Post deleted")
    }
    catch(err){
        res.status(400).send("Post cant be deleted")
    }
})

module.exports = router;