const Sequelize = require("sequelize")
//enum gender
const GenderEnum = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
  NOTSTATED: 3,
  properties: {
    0: { name: "MALE", value: 1 },
    1: { name: "FEMALE", value: 2 },
    2: { name: "OTHER", value: 3 },
    3: { name: "NOT STATED", value: 4 }
  }
}

const sequelize = new Sequelize(
  "postgres://wzabdsortgruyw:aee8095ee7c4dea4fa9377f80dd3a3bcdf1c97f09ce07763a7b9855821e12f3c@ec2-54-246-101-215.eu-west-1.compute.amazonaws.com:5432/d3u8ldv8lkbfbu",
  {
    ssl: true,
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    },
    logging: false
  }
)
//TODO FARE IL SETUP
const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },

  //credentials
  email: { type: Sequelize.STRING },
  //email deve essere verificata
  emailIsVerified: { type: Sequelize.BOOLEAN },
  password: { type: Sequelize.STRING },
  tag: { type: Sequelize.STRING },
  accountType: { type: Sequelize.ENUM(["BASIC", "PRO", "SITE"]) },

  //personal infos
  dateOfCreation: { type: Sequelize.DATEONLY },
  name: { type: Sequelize.STRING },
  gender: { type: Sequelize.ENUM(["FEMALE", "MALE", "OTHER", "NOT STATED"]) },
  friends: { type: Sequelize.ARRAY(Sequelize.UUID) },

  //TODO: GOOGLE,FACEBOOK,TWITTER
  //users blocatti
  //pagamenti
  //icone

  //preferences
  language: { type: Sequelize.ENUM(["en-GB", "en-US", "it-IT"]) },
  theme: { type: Sequelize.ENUM(["DARK", "LIGHT"]) }
  //date format
})

const Poll = sequelize.define("poll", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  pollName: { type: Sequelize.STRING },
  pollDescription: { type: Sequelize.STRING },
  questions: { type: Sequelize.ARRAY(Sequelize.UUID) },

  idOwner: { type: Sequelize.UUID },
  isFavourite: { type: Sequelize.BOOLEAN },
  isLive: { type: Sequelize.BOOLEAN }
  //if true, send notification and start the expires methods

  //devo gestire i metodi di chiusura del poll
})

const Question = sequelize.define("Question", {
  qName: { type: Sequelize.STRING },
  qDescription: { type: Sequelize.STRING },
  idQuestion: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  qType: { type: Sequelize.ENUM(["DATES", "STANDARD"]) },
  options: { type: Sequelize.STRING },
  //da disordinare ogni volta
  scores: { type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.DOUBLE)) },
  results: { type: Sequelize.ARRAY(Sequelize.DOUBLE) }
})

const PeopleInPoll = sequelize.define("PeopleInPoll", {
  idPoll: {
    type: Sequelize.UUID
  },
  idPerson: {
    type: Sequelize.UUID
  },
  hasVoted: { type: Sequelize.BOOLEAN }
})
module.exports = {
  User: User,
  Poll: Poll,
  PeopleInPoll: PeopleInPoll,
  Question: Question,
  GenderEnum: GenderEnum
}
