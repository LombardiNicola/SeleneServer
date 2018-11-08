const express = require("express")
const jwt = require("jsonwebtoken")
const secret = "78437v0842hr79bh7vfd02j379hv6s8t234fhqd"
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
  if (req.body.gender > 4) {
    res.status(767)
    res.send("Gender should be an element of enum")
    return
  }
  newUser.gender = database.GenderEnum.properties[req.body.gender].name
  newUser.friends = []
  //gestione login alternativi
  //TODO: GOOGLE,FACEBOOK,TWITTER
  //preferences
  newUser.language = "en-GB"
  newUser.theme = "LIGHT"

  //creo il nuovo user
  database.User.create(newUser)
  const payload = {
    userId: newUser.id
  }
  const token = jwt.sign(payload, secret, { expiresIn: "7d" })
  res.send(token)
})

app.get("/login", async (req, res) => {
  //TOTO check: non deve essere autenticato e
  auth(req, res)
  if (req.decoded != null) {
    res.status(718)
    res.send("Signup. You're already authenticated")
    return
  }
  //TODO crypto js
  let realUser = {}
  const password = req.body.password
  //gestire email e tag
  if (validator.validate(req.body.login)) {
    //email
    const email = req.body.login
    realUser = await database.User.find({
      where: { email: email, password: password }
    })
  } else {
    //tag
    if (req.body.login.startsWith("@") || req.body.login.indexOf("@") === -1) {
      const tag = req.body.login
      realUser = await database.User.find({
        where: { tag: tag, password: password }
      })
    } else {
      //none
      res.status(790)
      res.send("email or tag is not valid")
      return
    }
  }

  //codifica
  if (realUser.password === password) {
    //è ok, devo fare cose
    //do un token
    const payload = {
      userId: realUser.id
    }
    const token = jwt.sign(payload, secret, { expiresIn: "7d" })
    res.send(token)
    return
  } else {
    res.status(810)
    res.send("Password is not correct")
    return
  }
})

app.use("/user*", async (req, res, next) => {
  auth(req, res)
  if (!req.error === null) {
    res.status(res.error[0])
    res.send(res.error[1])
    return
  }
  next()
})

app.put("/user", async (req, res) => {
  //la modifica dei dei dati di login la farò in seguito
  const userId = req.body.userId
  const user = database.User.find({ where: { id: userId } })
  //controllo che non faccia modifiche troppo spesso
  if (true) {
    //oggi-user.updatedAt<1 giorno)
    res.status(854)
    res.send("You've already modified your account in the last 24 hours")
    return
  }
  //ora posso aggiornare i dati... ancora un volta... come lo faccio?
  res.send("//TODO")
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId
  res.send("//TODO")
})

app.post("/user/poll", async (req, res) => {
  const userId = req.decoded.user.id
  const newPoll = {}
  //id è autogestito
  newPoll.idOwner = userId
  newPoll.name = req.body.name
  newPoll.description = req.body.description
  newPoll.questions = []
  newPoll.isFavourite = false
  newPoll.isLive = false
  newPoll.isArchived = false
  database.Poll.create(newPoll)
  res.send(newPoll)
})

app.put("/user/poll", async (req, res) => {
  //cerco la poll
  const pollId = req.body.pollId
  const poll = await database.Poll.find({ where: { id: pollId } })
  //verifico che si abbiano i permessi per fare una modifica
  if (!poll.idOwner === req.body.userId) {
    res.status("867")
    res.send("Modifica Poll, you don't have permissions to modify this poll")
    return
  }
  //TODO faccio la modifica.. ha senso modificare tutto?
  //ha senso fare un ciclo e checkare singolo a singolo se è da modificare o meno?
  newPoll.name = req.body.name
  newPoll.description = req.body.description
  //TODO problem: id question come lo gestisco qua?
  // invoco la push di question?
  //di fatto, una question non può sussistere senza una poll... ha senso trattarla come tabella
  //o meglio come json?
  newPoll.questions = req.body.questions
  newPoll.isFavourite = req.body.isFavourite
  newPoll.isLive = req.body.isLive
  res.send("Done")
})

app.get("/user/favouritePolls", async (req, res) => {
  // decoded contains the payload of the JWT
  //TODO auth
  const userId = req.body.userid
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
