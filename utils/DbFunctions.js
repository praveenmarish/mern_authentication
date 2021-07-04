const User = require("../models/User");

module.exports.id_Getter = async (id) => {
  return await User.findById(id);
};

module.exports.create_User = async (username, email, password) => {
  return await User.create({
    username,
    email,
    password,
  });
};

module.exports.email_Getter = async (email) => {
  return await User.findOne({ email }).select("+password");
};
