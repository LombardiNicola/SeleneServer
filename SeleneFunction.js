function seleneFunction(question) {
  const scores = question.scores
  let results = []
  results = scores.reduce(
    (acc, curr) => [...acc, curr.reduce((acc1, curr1) => curr1 * acc1, 1)],
    []
  )
  results = results.reduce(
    (acc, curr) => [...acc, Math.pow(curr, 1.0 / scores[0].length)],
    []
  )

  console.log(results)
  console.log(question.results)

  //it seems to be anumber that's not lower than or equal to onother while not being greater than it
  question.results.sort((a, b) => {
    if (
      results[question.results.indexOf(a)] <=
      results[question.results.indexOf(b)]
    ) {
      console.log(a, b, 1)
      return 1
    }

    if (
      results[question.results.indexOf(a)] >
      results[question.results.indexOf(b)]
    ) {
      console.log(a, b, -1)
      return -1
    }
    console.log(a, b, 0)

    return 0
  })
  //variations... I'll not return the percentage
  /*question.rooted = question.results.reduce(
    (acc, curr) => [...acc, curr ** 0.5],
    []
  )*/

  return
}

module.exports = {
  seleneFunction: seleneFunction
}
