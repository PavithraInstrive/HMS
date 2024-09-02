const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.SECRET_KEY;
const boom = require("@hapi/boom");

function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    throw boom.notFound("Token Not Found");
  }
  
  const bearerToken = token.split(" ");
  jwt.verify(bearerToken[1], TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw boom.badRequest("Invalid Token");
    }

    req.user = decoded.user.id;
        
    next();
  });
}

// function authorize(req, res, next) {
//   const user = req.user;

//   if (user !== req.params._id) {
//     throw boom.forbidden("Unauthorized To Perform The operation");
//   } else {
//     next();
//   }
// }

module.exports = {
  authenticate,
  // authorize,
};
