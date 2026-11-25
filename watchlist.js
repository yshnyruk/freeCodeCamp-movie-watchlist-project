import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModification } from '../middleware/authorize.js';
import { addMovie, deleteMovie, getWatchlist, updateMovie } from '../utils/db.js';

const router = express.Router();

router.get("/:userId", authenticate, (req, res) => {
    const { userId } = req.params;
    const userIdParsed = Number(userId);
    res.json(getWatchlist(userIdParsed));
})

router.post("/:userId/movies", authenticate, authorizeModification, (req, res) => {
    const { userId } = req.params;
    const { title, genre } = req.body;
    const userIdParsed = Number(userId);
    const newMovie = {
        title,
        genre
    }
    addMovie(userIdParsed, newMovie);
    res.status(201).json({
        message: "Movie added to watchlist"
    })
})

router.put("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res) => {
    const { userId, movieId } = req.params;
    const userIdParsed = Number(userId);
    const movieIdParsed = Number(movieId);

    const { title, genre, watched } = req.body;
    let updatedMovie = {};
    if (title) {
        updatedMovie.title = title;
    }
    if (genre) {
        updatedMovie.genre = genre;
    }
    if (watched === "true" || watched === "false") {
        updatedMovie.watched = watched === "true"
    }
    updateMovie(userIdParsed, movieIdParsed, updatedMovie);
    res.json({
        message: "Movie successfully updated"
    })  
})

router.delete("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res) => {
    const { userId, movieId } = req.params;
    const userIdParsed = Number(userId);
    const movieIdParsed = Number(movieId);

    deleteMovie(userIdParsed, movieIdParsed);
    res.json({
        message: "Movie successfully deleted"
    })
})

export default router;
