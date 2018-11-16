/*debugFieldValid()

function debugFieldValid() {
  const fieldValid = require("./fieldValidation.js")
  //debugString(fieldValid)
  //debugInt(fieldValid)
  debugBoolean(fieldValid)
}

function debugBoolean(fieldValid) {
  console.log(fieldValid.isBoolean(true))
  console.log(fieldValid.isBoolean(1))
  console.log(fieldValid.isBoolean("ciao"))
  console.log(fieldValid.isBoolean([]))
  console.log(fieldValid.isBoolean(""))
  console.log(fieldValid.isBoolean(null))
  console.log(fieldValid.isBoolean({}))
}

function debugInt(fieldValid) {
  console.log(fieldValid.isInt(1))
  console.log(fieldValid.isInt("ciao"))
  console.log(fieldValid.isInt([]))
  console.log(fieldValid.isInt(""))
  console.log(fieldValid.isInt(null))
  console.log(fieldValid.isInt({}))
}

function debugString(fieldValid) {
  console.log(fieldValid.isString(1))
  console.log(fieldValid.isString("ciao"))
  console.log(fieldValid.isString([]))
  console.log(fieldValid.isString(""))
  console.log(fieldValid.isString(null))
  console.log(fieldValid.isString({}))
}
*/
function debugSelene() {
  const seleneFunc = require("./seleneFunction.js")
  const question = { scores: [[1, 2, 3], [2, 2, 2], [3, 3, 1]] }
  question.options = ["a", "b", "c"]
  question.results = seleneFunc.seleneFunction(question)
  //meglio non returnare la percentuale
  console.log(question.results)
  //console.log(question.asin)
}
