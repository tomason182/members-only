exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("You are not authoriezed");
    res.redirect("/");
  }
};

exports.isAdmin = (req, res, next) => {};
