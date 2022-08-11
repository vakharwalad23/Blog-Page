module.exports = (req, res)=>{
    var username = ''
    var password = ''
    var email = ''
    var number = ''
    const data = req.flash('data')[0]
    if(typeof data != 'undefined'){
        username = data.username
        password = data.password
        email = data.email
        number = data.number
    }
    res.render('register',{
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
        email: email,
        number: number
    })
}