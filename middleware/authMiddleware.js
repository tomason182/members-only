exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("You are not authoriezed");
    res.redirect("/");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({ msg: "You do not have admin grants" });
  }
};
