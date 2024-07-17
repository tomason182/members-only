exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("You are authorized");
  } else {
    console.log("You are not authoriezed");
  }
};

exports.isAdmin = (req, res, next) => {};
