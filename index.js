const express = require('express')
const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleWare = require('./middleware/validationMiddleware')

mongoose.connect('mongodb://localhost:27017/Blogger',{useNewUrlParser:true})


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

app.post('/posts/store', storePostController)

app.listen(4000 , ()=>{
    console.log('App listening on http://localhost:4000')
})