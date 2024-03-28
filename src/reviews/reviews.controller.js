const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function read(req, res) {
    const { review: data } = res.locals;
    res.json({ data });
}

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const foundReview = await reviewsService.read(reviewId);
    if (foundReview) {
        res.locals.review = foundReview;
        return next();
    }
    next({
        status: 404,
        message: "Review cannot be found",
    });
}

async function list(req, res) {
    res.json({ data: await reviewsService.list() });
}

async function update(req, res) {
  const updatedReview = { ...res.locals.review, ...req.body.data };
  await reviewsService.update(updatedReview);
  const returnData = await reviewsService.getReviewWithCritic(
    res.locals.review.review_id
  );
  res.json({ data: returnData });
}

async function destroy(req, res) {
    const { reviewId } = req.params;
    await reviewsService.destroy(reviewId);
    res.sendStatus(204);
}



module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};