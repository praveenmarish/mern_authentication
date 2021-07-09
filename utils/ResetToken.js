const crypto = require("crypto");

module.exports.TokenEncodeDecode = (Token) => {
  return crypto.createHash("sha256").update(Token).digest("hex");
};

module.exports.Generator = () => {
  return crypto.randomBytes(20).toString("hex");
};
