const jwt = require("jsonwebtoken");

//verifyToken
const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const encoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = encoded;
      console.log(encoded);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token privided, access denied" });
  }
};

//verifyTokenAndAdmin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Only admin, access denied" });
    }
  });
};

const verifyTokenForUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Only user himself, access denied" });
    }
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Only user himself or admin, access denied" });
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenForUser,
  verifyTokenAndAuthorization,
};
