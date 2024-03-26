const critics = require("../data/critics");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE critics RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("critics").insert(critics);
    });
};
