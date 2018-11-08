//TODO gestire cosa serve qua, cosa in server.js

const jwt = require("jsonwebtoken")
//TODO la chiave deve essere gestita da qualcosa dotenv js
const secret = "78437v0842hr79bh7vfd02j379hv6s8t234fhqd"

function auth(req, res) {
  req.decoded = null
  res.error = null
  const bearer = req.headers.authorization
  if (!bearer) {
    res.error = [401, "This route is for authenticated users only"]
    return
  } else if (!bearer.startsWith("Bearer ")) {
    res.error = [401, "The bearer passed is not prefixed with the word Bearer"]
    return
  } else {
    // remove the prefix Bearer
    const token = bearer.slice(7)

    // this must be the same secret with which we signed the token during the login
    jwt.verify(token, secret, async function(err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.error = [401, "The provided token is expired"]
          return
        } else {
          res.error = [401, "The provided token is invalid"]
          return
        }
      } else {
        req.decoded = decoded
        // decoded contains the payload of the JWT

        //TODO ha senso?
        const userId = req.decoded.userId

        //se voglio trovarne più di uno allora uso findAll
        const userFound = await database.User.find({ where: { id: userId } })
        // if we allowed to remove a user you should also check that the user still exists
        if (userFound === null) {
          res.error = [404, "User not found"]
          return
        }
        req.body.userId = userId
      }
    })
  }
  return
}

module.exports = {
  auth: auth
}
