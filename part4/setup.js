const bcrypt = require("bcrypt");
const User = require("./models/user");

const setUser = async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("salainen", 10);
  const user = new User({
    username: "mluukkai",
    name: "Matti Luukkainen",
    passwordHash,
  });

  await user.save();
};

module.exports = {
  setUser,
};
