const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const { user, pwd } = req?.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err?.message);
  }
};

module.exports = { handleRegister };
