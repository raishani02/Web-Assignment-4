const router = require("express").Router();
const verify = require('./verifyToken')
const Blog = require("../model/Blog");

router.post('/',verify ,async (req,res,next) =>{
    // res.json(req.user);
  //create a new blog
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    user_id: req.user
  });
  console.log(blog);
  try {
    //saved the new user to database
    const savedBlog = await blog.save();
    res.send('blog posted');
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = router;