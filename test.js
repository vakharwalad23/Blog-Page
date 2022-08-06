const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost:27017/Blogger',{useNewUrlParser:true})

let id = "62ed3c1e0401683c0a4dff69"

BlogPost.findById(id, (error, blogpost)=>{
    console.log(error, blogpost)
})