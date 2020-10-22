const express = require('express')
const app = express()
const session = require('express-session')
const mustacheExpress = require('mustache-express')
const tripsRouter = require('./routes/trips')
const { v4: uuidv4 } = require("uuid")


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')



app.use(express.urlencoded())

app.use(session({
    secret: 'somethingsomethingsomething',
    resave: false,
    saveUninitialized: true
}))

app.use('/styles', express.static('css'))
app.use('/pics', express.static('images'))

// uses the authenticate function to redirect you to login page if you're not logged in
// this will apply to all of the /trips pages 
app.use('/trips', authenticate, tripsRouter)



global.tripsList = []
global.users = []

app.get('/', (req, res) => {
    res.redirect('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let user = {
        userId: uuidv4(),
        username: username,
        password: password
    }
    users.push(user)
    console.log(users)
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if(persistedUser) {
        if(req.session) {
            req.session.username = username
            res.redirect('/trips')
        }
    } else {
        res.render('login', {message: 'Username or Password is incorrect'})
    }

})

function authenticate(req, res, next) {
    if(req.session) {
        if(req.session.username) {
            next()
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}



app.listen(3000, () => {
    console.log('Server is running...')
})