const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')

mongoose.connect('mongodb://localhost:27017/Blogger',{useNewUrlParser:true})

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.get('/', async (req, res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})
app.get('/about', (req, res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})
app.get('/contact', (req, res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})
app.get('/post/:id', async (req, res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
        blogpost
    })
})
app.get('/posts/new', (req, res)=>{
    res.render('create')
})
app.post('/posts/store',(req, res)=>{
    // Model creates a new doc with browser data
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/assets/img', image.name),async(error)=>{
        await BlogPost.create({...req.body,
            image:'/assets/img/'+image.name
        })
            res.redirect('/')
    })
})

app.listen(4000 , ()=>{
    console.log('App listening on http://localhost:4000')
})