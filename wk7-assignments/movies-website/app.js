const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const moviesRouter = require('./routes/movies')


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

global.movies = []

app.use('/styles', express.static('css'))
app.use('/pics', express.static('images'))

app.use(express.urlencoded())

app.use('/movies', moviesRouter)







app.listen(3000, () => {
    console.log('Server is running...')
})