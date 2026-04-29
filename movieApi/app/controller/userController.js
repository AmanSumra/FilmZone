const User = require("../models/User");
const Movie = require("../models/Movie");
const Booking = require("../models/Booking");
const utils = require("../common/utils");
const { FOLDER_NAME } = require("../common/constants");
const bcrypt = require("bcrypt");
const { response } = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { transporter, ticketBookingHtml } = require("../utils/mailer.js");

// 1. Registration
exports.Registration = async (req, res) => {
  const requestData = req.body;

  try {
    if (!requestData.FirstName || !requestData.Email || !requestData.Password) {
      return res
        .status(400)
        .json({ success: false, message: "Name, Email and Password are required" });
    }

    const existingUser = await User.findOne({ Email: requestData.Email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashpassword = await bcrypt.hash(requestData.Password, 10);

    const newUser = new User({
      FirstName: requestData.FirstName,
      Email: requestData.Email,
      Password: hashpassword,
      dob: requestData.DateOfBirth || new Date(),
      Gender: requestData.Gender || "male",
      Number: requestData.Number || 0,
    });

    const savedUser = await newUser.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Account created successfully",
      result: {
        _id: savedUser._id,
        FirstName: savedUser.FirstName,
        Email: savedUser.Email,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server internal Error!!!",
      error: err.message,
    });
  }
};

// 2. User Login
exports.userLogin = async (req, res) => {
  const postData = req.body;

  try {
    if (!postData.Email || !postData.Password) {
      return res
        .status(400)
        .send({ success: false, status: 400, message: "Email and Password are required" });
    }

    const user = await User.findOne({ Email: postData.Email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, status: 400, message: "Invalid Email or User not found" });
    }

    const checkPass = await bcrypt.compare(postData.Password, user.Password);

    if (!checkPass) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Invalid Password",
        result: {},
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Logged in successfully",
      result: user,
      token: true,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).send({
      success: false,
      message: "Server error during login",
      error: err.message,
    });
  }
};

// 3. Add Ticket
exports.addTicket = async (req, res) => {
  if (req.body.bookedSeat.length > 0) {
    try {
      const bookedSeats = req.body.bookedSeat.join(", ");
      const newBooking = new Booking({
        bookingId: req.body.userId,
        movieId: req.body.movieId,
        movieName: req.body.movieName,
        movieScreen: req.body.movieScreen,
        email: req.body.email,
        bookedSeat: bookedSeats,
        movieDate: req.body.movieDate,
        movieTime: req.body.movieTime,
        total_price: req.body.amount,
        orderId: req.body.orderId,
        payment_status: 'paid',
        razorpay_payment_id: req.body.orderId,
      });

      await newBooking.save();

      // Send booking confirmation email to user
      if (req.body.email) {
        console.log("📧 Attempting to send email to:", req.body.email);
        try {
          const mailOptions = {
            from: `"FilmZone" <${process.env.FROM_EMAIL}>`,
            to: req.body.email,
            subject: `🎬 Your Ticket is Confirmed - ${req.body.movieName}`,
            text: `Hi ${req.body.userName || "Valued Customer"},\n\nYour ticket for ${req.body.movieName} has been booked successfully!\n\nMovie: ${req.body.movieName}\nScreen: ${req.body.movieScreen}\nSeats: ${bookedSeats}\nDate: ${req.body.movieDate}\nTime: ${req.body.movieTime}\nTotal Amount: ₹${req.body.amount}\nOrder ID: ${req.body.orderId}\n\nThank you for booking with us!`,
            html: ticketBookingHtml({
              movieName: req.body.movieName,
              movieScreen: req.body.movieScreen,
              bookedSeat: bookedSeats,
              movieDate: req.body.movieDate,
              movieTime: req.body.movieTime,
              totalPrice: req.body.amount,
              orderId: req.body.orderId,
              userName: req.body.userName || "Valued Customer",
            }),
          };
          console.log("📧 Mail options:", JSON.stringify(mailOptions, null, 2));
          const info = await transporter.sendMail(mailOptions);
          console.log("✅ Booking confirmation email sent!");
          console.log("📧 Message ID:", info.messageId);
          console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
        } catch (emailErr) {
          console.error("❌ Failed to send booking email:", emailErr.message);
          console.error("❌ Error details:", emailErr);
          // Don't fail the booking if email fails
        }
      } else {
        console.log("⚠️ No email provided, skipping email notification");
      }

      return res
        .status(200)
        .json({ success: true, message: "Booking Successfull" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: err.message,
      });
    }
  } else {
    return res
      .status(200)
      .json({ success: true, status: 200, message: "Updated successfully" });
  }
};

// 4. Add Movie
exports.addMovie = async (req, res) => {
  const requestData = req.body;
  let image_file = req.files;

  try {
    if (image_file && image_file.length > 0) {
      const image_name = req.files[0].originalname;
      const url = utils.getStoreImageFolderPath(1) + image_name;
      requestData.MoviePhotos = url;

      utils.storeImageToFolder(image_file[0].path, image_name, 1);
    }

    const newMovie = new Movie({
      MoviePrice: requestData.price,
      MoviePhotos: requestData.MoviePhotos,
      MovieName: requestData.MovieName,
      MovieDate: requestData.MovieDate,
      MovieScreen: requestData.MovieScreen,
      Description: requestData.Description,
      Status: requestData.Status,
      Cast: requestData.Cast || "",
      Director: requestData.Director || "",
      Genre: requestData.Genre || "",
      Duration: requestData.Duration || "",
      Language: requestData.Language || "Hindi"
    });

    const saved = await newMovie.save();
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Movie Add successfully",
      result: saved,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Server Internal error",
      error: err.message,
    });
  }
};

exports.detailsMoviebyid = async (req, res) => {
  try {
    // 1. URL પેરામીટર્સમાંથી 'id' મેળવો
    const { id } = req.params;

    // 2. ID વેલિડ છે કે નહીં તે તપાસો
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "અયોગ્ય મૂવી ID ફોર્મેટ",
      });
    }

    // 3. ડેટાબેઝમાં ID દ્વારા મૂવી શોધો
    const movie = await Movie.findById(id);

    // 4. જો મૂવી ન મળે, તો 404 એરર મોકલો
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "આ ID સાથે કોઈ મૂવી મળી નથી",
      });
    }

    // 5. જો મૂવી મળે, તો ડેટા સાથે સફળતાપૂર્વક રિસ્પોન્સ મોકલો
    res.status(200).json({
      success: true,
      result: movie,
    });
  } catch (error) {
    // 6. જો કોઈ સર્વર એરર આવે તો
    console.error("ID દ્વારા મૂવી મેળવવામાં ભૂલ:", error);
    res.status(500).json({
      success: false,
      message: "મૂવી મેળવતી વખતે સર્વર એરર આવી",
    });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  let image_file = req.files;

  try {
    if (image_file && image_file.length > 0) {
      const image_name = req.files[0].originalname;
      const url = utils.getStoreImageFolderPath(1) + image_name;
      req.body.MoviePhotos = url;

      utils.storeImageToFolder(image_file[0].path, image_name, 1);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid movie ID format" });
    }

    // Get the old movie data before updating
    const oldMovie = await Movie.findById(id);
    if (!oldMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    const oldImagePath = oldMovie.MoviePhotos;

    // Get text data from the request body
    const updateData = { ...req.body };

    // Check if a new file has been uploaded
    if (req.file) {
      // If yes, add the new photo's path to the update data
      updateData.MoviePhotos = req.file.path;
    }

    // Update the movie in the database
    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // If a new file was uploaded and an old photo exists, delete the old photo
    if (req.file && oldImagePath) {
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old file:", err);
        } else {
          console.log("Successfully deleted old file:", oldImagePath);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      result: updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "incorrect id" });
    }

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "movie not found" });
    }

    res.status(200).json({ success: true, message: "movie deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

// 5. Get All Movies
exports.detailsMovie = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ _id: -1 });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Fetched successfully",
      result: movies,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Server Internal error", error: err });
  }
};

// 6. Get Single Movie
exports.detailsGetSingleMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.body.id);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Fetched successfully",
      result: movie,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Server Internal error", error: err });
  }
};

// 7. Search Movie
exports.searchMovie = async (req, res) => {
  try {
    let movies = [];

    if (req.body.MovieName !== "") {
      movies = await Movie.find({
        MovieName: { $regex: req.body.MovieName, $options: "i" },
      });
    } else {
      movies = await Movie.find().sort({ _id: -1 });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Fetched successfully",
      result: movies,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Server Internal error", error: err });
  }
};

// 8. Payment Status Update
exports.PaymentStatus = async (req, res) => {
  try {
    const result = await Booking.updateOne(
      { bookedSeat: req.body.seat },
      {
        $set: {
          payment_status: req.body.payment_status,
          razorpay_payment_id: req.body.razorpay_payment_id,
        },
      }
    );
    return res
      .status(200)
      .send({ success: true, status: 200, message: "Bill detail", result });
  } catch (err) {
    return res
      .status(400)
      .send({ success: false, message: "Server Internal error", error: err });
  }
};

// 9. Get Booked Seats
exports.detailsTicket = async (req, res) => {
  try {
    const results = await Booking.find({
      movieId: req.body.id,
      movieDate: req.body.date,
      movieTime: req.body.time,
    });

    const bookedSeats = results
      .reduce(
        (acc, curr) =>
          acc.concat(curr.bookedSeat.split(",").map((seat) => seat.trim())),
        []
      )
      .join(",");

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Fetched booked seats successfully",
      bookedSeats,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Server Internal error", error: err });
  }
};

// 10. User's Recent Bookings
exports.recentBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ bookingId: req.params.id })
      .populate("movieId")
      .sort({ created_at: -1 });

    const result = bookings.map((b) => ({
      ...b._doc,
      MovieName: b.movieId?.MovieName,
      MovieScreen: b.movieId?.MovieScreen,
      MovieDate: b.movieId?.MovieDate,
      MoviePhotos: b.movieId?.MoviePhotos,
      seats: b.bookedSeat,
      total_price: b.total_price,
      payment_status: b.payment_status || 'paid',
    }));

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Details Booking",
      result: result,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Server Internal error", error: err });
  }
};

// 11. Admin's Recent Bookings
exports.recentBookingAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("movieId")
      .sort({ created_at: -1 });

    const result = bookings.map((b) => ({
      ...b._doc,
      Email: b.email,
      MovieName: b.movieId?.MovieName,
      MovieScreen: b.movieId?.MovieScreen,
      MovieDate: b.movieId?.MovieDate,
      MoviePhotos: b.movieId?.MoviePhotos,
      seats: b.bookedSeat,
      total_price: b.total_price,
      payment_status: b.payment_status || 'paid',
    }));

    return res
      .status(200)
      .json({ success: true, status: 200, message: "Details Booking", result });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Server Internal error", error: err });
  }
};

// 12. Booking From Date
exports.bookingFromDate = async (req, res) => {
  try {
    const bookings = await Booking.find({ movieId: req.body.movieId }).populate(
      "movieId"
    );

    const grouped = {};
    bookings.forEach((b) => {
      const date = new Date(b.created_at).toISOString().split("T")[0];
      if (!grouped[date]) grouped[date] = [];

      grouped[date].push(b.bookedSeat);
    });

    const result = Object.entries(grouped).map(([date, seats]) => ({
      orderId: "", // optional to include
      booking_date: date,
      MovieName: bookings[0]?.movieId?.MovieName,
      movieTime: bookings[0]?.movieId?.movieTime,
      seats: seats.join(","),
    }));

    return res
      .status(200)
      .json({ success: true, status: 200, message: "Details Booking", result });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Server Internal error", error: err });
  }
};
