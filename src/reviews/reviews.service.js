const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

const tableName = "reviews";

function read(reviewId) {
    return knex(tableName)
        .select("*")
        .where({ review_id: reviewId })
        .first();
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
    read,
    update,
    destroy,
};
