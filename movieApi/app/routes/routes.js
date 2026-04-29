const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../config/auth");
const UserController = require("../controller/userController");
const ContactController = require("../controller/contactusController");
const PaymentController = require("../controller/paymentController");
const AIController = require("../controller/aiController");
const ReviewController = require("../controller/reviewController");

const upload = multer({ dest: "movieApi/uploads/" });

//login
router.post("/user_login", UserController.userLogin);
router.post("/user_registration", UserController.Registration);

// Reviews
router.post("/add/review", ReviewController.addReview);
router.get("/get/reviews/:movieId", ReviewController.getReviews);

//product
router.post("/add/ticket", UserController.addTicket);
router.post("/add/movie", upload.any(), UserController.addMovie);
router.get("/detail/movie", UserController.detailsMovie);
router.get("/detail/movie/:id", UserController.detailsMoviebyid);
router.delete("/delete/movie/:id",UserController.deleteMovie);
router.put("/update/movie/:id", upload.any(), UserController.updateMovie);

router.post("/update/serviceStatus", UserController.PaymentStatus);
router.post("/detail/seat", UserController.detailsTicket);
router.post("/detail/movie", UserController.detailsGetSingleMovie);
router.post("/search/movie", UserController.searchMovie);

router.post("/detail/bookingFromDate", UserController.bookingFromDate);
router.get("/recentbooking/:id", UserController.recentBooking);
router.get("/recentbookings", UserController.recentBookingAdmin);

router.post("/add/contactus", ContactController.ContactUs);


//booking
// router.post("/orders", PaymentController.orderCreate);
router.post("/checkout", PaymentController.checkout);
// router.post("/paymentverification", PaymentController.paymentVerification);

// AI Chat for movie suggestions
router.post("/ai/chat", AIController.aiChat);

module.exports = router;