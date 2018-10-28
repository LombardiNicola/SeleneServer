const express = require("express")
const jwt = require("jsonwebtoken")
const database = require("./database.js")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const authentication = require("./auth")
const auth = authentication.auth
const zxcvbn = require("zxcvbn")
const validator = require("email-validator")

const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.json({ type: "*/*" }))

app.post("/signup", async (req, res) => {
  //TODO check: voglio che non sia autenticato
  auth(req, res)
  if (req.decoded != null) {
    res.status(718)
    res.send("Signup. You're already authenticated")
    return
  }
  const newUser = {}
  //manca la verifica dei dati
  //TODO crypto js
  newUser.password = req.body.password
  const passwordStats = zxcvbn(newUser.password)
  if (passwordStats.score < 3) {
    res.status(772)
    res.send("Signup, password is too vulnerable")
    return
  } //else: ok password is strong enough
  //gestire email e tag
  newUser.tag = req.body.tag

  if (!validator.validate(req.body.email)) {
    res.status(790)
    res.send("email is not valid")
    return
  }
  newUser.email = req.body.email
  //verifica tag
  const userFound = await database.User.find({
    where: { [Op.or]: [{ tag: newUser.tag }, { email: newUser.email }] }
  })

  // exists?
  if (userFound !== null) {
    if (userFound.email === req.body.email) {
      res.status(782)
      res.send("An existing account is linked to this email")
      return
    }
    res.status(782)
    res.send("this tag isn't available")
    return
  }

  newUser.emailIsVerified = false
  //account type: default=basic
  //
  //personal infos
  newUser.name = req.body.name + " " + req.body.surname
  //newUser.dateOfCreation = req.body.dateOfCreation //TODO posso mettere la data di oggi
  //check dell'enum
  //req.body.gender should be a number

  //TODO non funziona una cippa!!!
  if (!(req.body.gender < 4)) {
    res.status(767)
    res.send("Gender should be an element of enum")
    return
  }
  newUser.gender = database.GenderEnum.properties[req.body.gender].name

  newUser.gender = "FEMALE"
  newUser.friends = []
  //gestione login alternativi
  //TODO: GOOGLE,FACEBOOK,TWITTER
  //preferences
  newUser.language = "en-GB"
  newUser.theme = "LIGHT"

  //creo il nuovo user
  database.User.create(newUser)
  res.send("ciao")
  //res.send(jwt.sign(secret))
})

app.get("/login", async (req, res) => {
  //TOTO check: non deve essere autenticato e
  //TODO decoded non è body
  //TODO crypto js
  const password = req.decoded.password
  //gestire email e tag
  const tag = req.decoded.tag
  //codifica

  const realUser = await database.User.find({ where: { tag: tag } })
  //codifica
  if (password === realUser.password) {
    //è ok, devo fare cose
    //do un token
    res.send(jwt.sign(secret))
  } else {
    res.status(810)
    res.send("Password is not correct")
    return
  }
})

app.use("/user/*", async (req, res, next) => {
  if (!req.trouble === null) {
    res.status(res.trouble[0])
    res.send(res.trouble[1])
    return
  }
  next()
})

app.post("/user/poll", async (req, res) => {
  const userId = req.decoded.user.id
  const newPoll = {}
  //id è autogestito
  newPoll.idOwner = userId
  newPoll.name = req.body.name
  newPoll.description = req.body.description
  //questions
  newPoll.isFavourite = false
  newPoll.isLive = false
  database.Poll.create(newPoll)
  res.send(newPoll)
})

//app.push("/user/poll") //modifica

app.get("/user/favouritePolls", async (req, res) => {
  // decoded contains the payload of the JWT
  //TODO auth
  const userId = req.decoded.user.id
  const favPolls = await database.Poll.findAll({
    where: { idOwner: userId, isFavourite: true }
  })
  //TODO devo joinare con le questions, oppure no,dipende da come voglio gestirla
  res.send(favPolls) //returno roba, auto json
})

//TODO CAMBIO TIER ACCOUNT

const server = app.listen(80, function() {
  const host = server.address().address
  const port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})

//ogni giorno controllo se ci sono account da eliminare (una settimana(?) senza verifica email)
//ogni tot controllo se ci sono notifiche da inviare (se non sono ancora state inviate)
//da gestire l'aggiunta di opzioni in collettiva (brainstorming)
