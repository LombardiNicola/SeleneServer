function seleneFunction(question) {
  const scores = question.scores
  question.results = []
  question.buffed = []
  let product = []
  let sum = []
  for (let i = 0; i < scores.length; i++) {
    product[i] = 1
    sum[i] = 0
    for (let j = 0; j < scores[i].length; j++) {
      product[i] = product[i] * scores[i][j]
      sum[i] = sum[i] + scores[i][j]
    }
    question.results[i] =
      Math.pow(product[i], 1.0 / scores[i].length) / scores.length
    question.buffed[i] =
      (question.results[i] + sum[i] / (scores[i].length * scores.length)) / 2
    //question.results[i] = Math.pow(question.results[i], 1.0 / 2)
    //question.buffed[i] = Math.pow(question.buffed[i], 1.0 / 2)
    //da provare arcoseno, in teoria dovrebbe scalare bello
    //question.asin[i] = (Math.asin(question.results[i]) / Math.PI) * 2
  }
  return
}

module.exports = {
  seleneFunction: seleneFunction
}
