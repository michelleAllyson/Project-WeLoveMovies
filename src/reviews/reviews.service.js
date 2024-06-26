const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "reviews";
const addCriticDetails = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});
function read(reviewId) {
    return knex(tableName)
        .select("*")
        .where({ review_id: reviewId })
        .first();
}
async function getReviewWithCritic(reviewId) {
  const result = await knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first();
    
  const updatedReview = addCriticDetails(result);
  return updatedReview;
}

function update(updatedReview) {
    return knex(tableName)
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*");
}

function destroy(reviewId) {
    return knex(tableName).where({ review_id: reviewId }).del();
}

module.exports = {
  update,
  getReviewWithCritic,
  read,
  destroy,
};
