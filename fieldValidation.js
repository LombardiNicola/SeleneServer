//in questo file, ci saranno tutti i metodi che permettono di verificare che, al momento di agire sul database, i dati da inserire siano accettabili

const validator = require("email-validator")

function isString(x) {
  try {
    return x === x.toString() && x != "" ? true : false
  } catch (e) {
    return false
  }
}

function isTag(x) {
  isString(x) && x[0] == "@"
}
function isInt(x) {
  return Number.isFinite(x)
}

function isBoolean(x) {
  try {
    return x === true || x === false ? true : false
  } catch (e) {
    return false
  }
}

User = {
  //id già checkato
  //TODO: SEE YA LATER
  //credentials
  email: validator.validate,
  //email deve essere verificata
  emailIsVerified: isBoolean,
  password: isString,
  tag: isTag,
  //accountType

  //personal infos
  name: isString,
  surname: isString,
  //gender: { type: Sequelize.ENUM(["FEMALE", "MALE", "OTHER", "NOT STATED"]) },
  friends: isArray

  //TODO: GOOGLE,FACEBOOK,TWITTER
  //users blocati
  //pagamenti
  //icone

  //preferences
  //language: { type: Sequelize.ENUM(["en-GB", "en-US", "it-IT"]) },
  //theme: { type: Sequelize.ENUM(["DARK", "LIGHT"]) }
}

module.exports = {
  /*isString: isString,
  isInt: isInt,
  isBoolean: isBoolean*/
}
