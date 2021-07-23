module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ "error":"You must login first!"});
  }
};