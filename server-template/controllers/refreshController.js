const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefresh = async (req, res) => {
  const cookies = req?.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== foundUser.username)
      return res.sendStatus(403);
    // get roles values
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create new accessToken
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken, roles });
  });
};

module.exports = { handleRefresh };
