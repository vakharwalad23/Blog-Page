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
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash')


mongoose.connect('mongodb://localhost:27017/Blogger',{useNewUrlParser:true})


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSession({
    secret: 'dhruv'
}))
app.use(flash())
global.loggedIn = null

app.use('*', (req, res, next)=>{
    loggedIn = req.session.userId
    next()
})
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)

app.get('/', homeController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware ,newUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware ,loginController)

app.post('/users/register', redirectIfAuthenticatedMiddleware ,storeUserController)

app.post('/users/login', redirectIfAuthenticatedMiddleware ,loginUserController)

app.get('/auth/logout', logoutController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware ,newPostController)

app.post('/posts/store', authMiddleware ,storePostController)

app.use((req, res)=>{
    res.render('notfound')
})

app.listen(4000 , ()=>{
    console.log('App listening on http://localhost:4000')
})