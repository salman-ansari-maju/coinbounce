const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "ansari";
const Token = require("../models/token");
class JWTService {
  // sign access token

  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: expiryTime });
  }

  //sign refresh token
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: expiryTime });
  }

  //verify access token

  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: expiryTime });
  }
  //verify refresh token

  static verifyAccessToken(token) {
    return jwt.verify(token, TOKEN_SECRET);
  }
  // store refresh token
  static async storeToken(token, userId) {
    try {
      const newToken = new Token({
        token: token,
        userId: userId,
      });
      // store in db
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JWTService;
