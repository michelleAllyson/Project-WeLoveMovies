const { movies, theaters } = require('../data');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE movies_theaters RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('movies_theaters').insert(
        theaters.reduce((acc, theater) => {
          const movieId = movies.find((movie) => {
            return movie.title === theater.movie_title;
          }).movie_id;
          acc.push({
            movie_id: movieId,
            theater_id: theater.theater_id,
          });
          return acc;
        }, [])
      );
    });
};
