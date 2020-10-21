const express = require('express')
const router = express.Router()
const {v4:uuidv4} = require('uuid')




router.get('/', (req, res) => {
    res.render('movies', {movies: movies})
})

router.post('/create', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const genre = req.body.genre
    const moviePoster = req.body.moviePoster

    let movie = {
        title: title,
        description: description,
        genre: genre,
        moviePoster: moviePoster,
        movieId: uuidv4()
    }

    movies.push(movie)

    res.redirect('/movies')
})

router.post('/delete', (req, res) => {
    const movieId = req.body.movieId

    movies = movies.filter(movie => {
        return movie.movieId != movieId
    })

    res.redirect('/movies')
})

module.exports = router