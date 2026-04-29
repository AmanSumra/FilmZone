const Movie = require("../models/Movie");
const User = require("../models/User");

exports.addReview = async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;

    if (!movieId || !userId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Movie ID, User ID and Rating are required"
      });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const existingReview = movie.Reviews.find(r => r.userId.toString() === userId);
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      movie.Reviews.push({
        userId: userId,
        userName: user.FirstName,
        rating: rating,
        comment: comment
      });
    }

    const totalRating = movie.Reviews.reduce((sum, r) => sum + r.rating, 0);
    movie.AverageRating = totalRating / movie.Reviews.length;

    await movie.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      reviews: movie.Reviews,
      averageRating: movie.AverageRating
    });

  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    res.status(200).json({
      success: true,
      reviews: movie.Reviews,
      averageRating: movie.AverageRating
    });

  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};