const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "movies";

function read(movieId) {
  return knex(tableName)
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

function list() {
  return knex(tableName).select("*");
}

function inTheatersNow() {
  return knex("movies as m")
    .distinct("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.is_showing": true });
}

function listTheaters(movieId) {
  return knex("theaters as t")
    .select("t.*")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId });
}

const addCriticDetails = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
        const reviewsCriticDetails = [];
        reviews.forEach((review) => {
          const addedCritic = addCriticDetails(review);
          reviewsCriticDetails.push(addedCritic);
        });
        return reviewsCriticDetails;
      });
}



module.exports = {
  read,
  list,
  inTheatersNow,
  listTheaters,
  listReviews,
};