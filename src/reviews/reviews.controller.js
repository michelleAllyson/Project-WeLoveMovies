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
        message: "Review cannot be found.",
    });
}

async function list(req, res) {
    res.json({ data: await reviewsService.list() });
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    await reviewsService.update(updatedReview);
    res.json({ data: updatedReview });
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