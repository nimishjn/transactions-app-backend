const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      code: "E5",
    });
  }

  try {
    req.userEmail = jwt.verify(token, process.env.TOKEN_SECRET).username;
    console.log("> Token verified from ", req.userEmail);
    next();
  } catch (err) {
    res.status(400).json({
      code: "E4",
    });
  }
};

module.exports = verifyJWT;
