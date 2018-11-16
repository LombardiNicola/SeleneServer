//in questo file, ci saranno tutti i metodi che permettono di verificare che, al momento di agire sul database, i dati da inserire siano accettabili
function isString(x) {
  try {
    return x === x.toString() && x != "" ? true : false
  } catch (e) {
    return false
  }
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

function user(x){
    //id già checkato
    //TODO: SEE YA LATER
      //credentials
      email: { type: Sequelize.STRING },
      //email deve essere verificata
      emailIsVerified: { type: Sequelize.BOOLEAN },
      password: { type: Sequelize.STRING },
      tag: { type: Sequelize.STRING },
      accountType: {
        type: Sequelize.ENUM(["NEW MOON", "FULL MOON", "SUPERMOON", "BLOODMOON"])
      },
    
      //personal infos
      name: { type: Sequelize.STRING },
      surname: { type: Sequelize.STRING },
      gender: { type: Sequelize.ENUM(["FEMALE", "MALE", "OTHER", "NOT STATED"]) },
      friends: { type: Sequelize.ARRAY(Sequelize.UUID) },
    
      //TODO: GOOGLE,FACEBOOK,TWITTER
      //users blocati
      //pagamenti
      //icone
    
      //preferences
      language: { type: Sequelize.ENUM(["en-GB", "en-US", "it-IT"]) },
      theme: { type: Sequelize.ENUM(["DARK", "LIGHT"]) }
}

module.exports = {
  /*isString: isString,
  isInt: isInt,
  isBoolean: isBoolean*/
}
