const { User, Poll, PeopleInPoll } = require("./database.js")

async function setup() {
  await User.sync({ force: true })
  await Poll.sync({ force: true })
  await PeopleInPoll.sync({ force: true })

  console.log("done")
  process.exit(0)
}

setup()
