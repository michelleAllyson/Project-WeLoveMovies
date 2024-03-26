const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { as } = require('../db/connection');

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const foundMovie = await moviesService.read(movieId);
    if (foundMovie) {
      res.locals.movie = foundMovie;
      return next();
    } 
    next ({
        status: 404,
        message: `Movie id not found: ${movieId}`,
    })
}

async function list(req, res) {
  const isShowing = req.query.is_showing === 'true';
  const data = await moviesService.list(isShowing);
  res.json({ data });
}

async function listTheaters(req, res) {
    const { movieId } = req.params;
    const data = await moviesService.listTheaters(movieId);
    res.json({ data });
}

async function listReviews(req, res) {
    const { movieId } = req.params;
    const data = await moviesService.listReviews(movieId);
    res.json({ data });
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), read],
    list: asyncErrorBoundary(list),
    listTheaters: asyncErrorBoundary(listTheaters),
    listReviews: asyncErrorBoundary(listReviews),
};