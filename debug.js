const seleneFunc = require("./seleneFunction.js")
const question = { scores: [[1, 2, 3], [2, 2, 2], [3, 3, 1]] }
question.options = ["a", "b", "c"]
question.results = seleneFunc.seleneFunction(question)
//meglio non returnare la percentuale
console.log(question.results)
//console.log(question.asin)
