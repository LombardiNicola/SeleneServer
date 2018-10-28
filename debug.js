const seleneFunc = require("./seleneFunction.js")
const question = { scores: [[1, 2, 3], [2, 2, 2], [3, 2, 1]] }
seleneFunc.seleneFunction(question)
console.log(question.results)
console.log(question.buffed)
console.log(question.asin)
