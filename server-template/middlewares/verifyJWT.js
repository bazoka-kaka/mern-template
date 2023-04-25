const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const headers = req.headers?.authorization || req.headers?.Authorization;
  if (!headers?.includes("Bearer ")) return res.sendStatus(401);
  const accessToken = headers.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
