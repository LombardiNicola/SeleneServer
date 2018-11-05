const seleneFunc = require("./seleneFunction.js")
const question = { scores: [[1, 2, 3], [2, 2, 2], [3, 3, 1]] }
question.results = ["a", "b", "c"]
seleneFunc.seleneFunction(question)
//meglio non returnare la percentuale
console.log(question.results)
//console.log(question.asin)
