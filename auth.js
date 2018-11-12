const database = require("./database.js")
const jwt = require("jsonwebtoken")
//TODO la chiave deve essere gestita da qualcosa dotenv js
const secret = "78437v0842hr79bh7vfd02j379hv6s8t234fhqd"

function auth(req, res) {
  return new Promise((resolve, reject) => {
    const bearer = req.headers.authorization
    if (!bearer) {
      console.log(1)
      reject([401, "This route is for authenticated users only"])
    } else if (!bearer.startsWith("Bearer ")) {
      console.log(2)
      reject([401, "The bearer passed is not prefixed with the word Bearer"])
    } else {
      // remove the prefix Bearer
      const token = bearer.slice(7)

      // this must be the same secret with which we signed the token during the login
      jwt.verify(token, secret, async function(err, decoded) {
        if (err) {
          if (err.name === "TokenExpiredError") {
            console.log(3)
            reject([401, "The provided token is expired"])
          } else {
            console.log(4)
            reject([401, "The provided token is invalid"])
          }
        } else {
          // decoded contains the payload of the JWT
          const userId = decoded.userId
          console.log("userID: " + userId)
          //se voglio trovarne più di uno allora uso findAll
          const userFound = await database.User.find({ where: { id: userId } })
          // if we allowed to remove a user you should also check that the user still exists
          console.log("dopo ricerca")
          if (userFound === null) {
            console.log("dentro if")
            console.log(5)
            reject([404, "User not found"])
          }
          console.log("userID: " + userId)
          resolve(userId)
        }
      })
    }
    return
  })
}

module.exports = {
  auth: auth
}

/*
function auth(req, res) {
  const bearer = req.headers.authorization
  if (!bearer) {
    return [false, [401, "This route is for authenticated users only"]]
  } else if (!bearer.startsWith("Bearer ")) {
    return [
      false,
      [401, "The bearer passed is not prefixed with the word Bearer"]
    ]
  } else {
    // remove the prefix Bearer
    const token = bearer.slice(7)

    // this must be the same secret with which we signed the token during the login
    jwt.verify(token, secret, async function(err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return [false, [401, "The provided token is expired"]]
        } else {
          return [false, [401, "The provided token is invalid"]]
        }
      } else {
        // decoded contains the payload of the JWT
        const userId = decoded.userId
        console.log("userID: " + userId)
        //se voglio trovarne più di uno allora uso findAll
        const userFound = await database.User.find({ where: { id: userId } })
        // if we allowed to remove a user you should also check that the user still exists
        console.log("dopo ricerca")
        if (userFound === null) {
          console.log("dentro if")
          return [false, [404, "User not found"]]
        }
        console.log("userID: " + userId)
        return [true, userId]
      }
    })
  }
  return
}
*/
