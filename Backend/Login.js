const bcrypt = require("bcryptjs");
const isPasswordCorrect = async password => {
  const hashPedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashPedPassword);
  const isMatch = await bcrypt.compare("12345", hashPedPassword);
  return isMatch
};

module.exports = { isPasswordCorrect };
