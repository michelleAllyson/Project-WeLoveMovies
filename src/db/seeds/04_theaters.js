const theaters = require('../data/theaters');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE theaters RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('theaters').insert(theaters);
    });
}
