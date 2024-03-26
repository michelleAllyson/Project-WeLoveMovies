const movies = require('../data/movies');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE movies RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert(movies);
    });
};
