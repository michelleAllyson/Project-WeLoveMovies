const knex = require("../db/connection");

const tableName = "movies";

function read(movieId) {
  return knex(tableName)
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

function list(isShowing) {
    if (isShowing) {
        return knex("movies as m")
        .distinct("m.*")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .where({ "mt.is_showing": true });
    }
    return knex(tableName).select("*");
}

function listTheaters(movieId) {
  return knex("theaters as t")
    .select("t.*")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId });
}

function listReviews(movieId) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.movie_id": movieId });
}

module.exports = {
  read,
  list,
  listTheaters,
  listReviews,
};