const reviews = require('../../data/reviews');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE reviews RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert(reviews);
    });
};
