function seleneFunction(question) {
  const scores = question.scores
  let gMedia = []
  gMedia = scores.reduce(
    (acc, curr) => [...acc, curr.reduce((acc1, curr1) => curr1 * acc1, 1)],
    []
  )
  gMedia = gMedia.reduce(
    (acc, curr) => [...acc, Math.pow(curr, 1.0 / scores[0].length)],
    []
  )

  //reduce mode on
  const optMatrix = gMedia.reduce(
    (acc, curr, index) => [...acc, [question.options[index], curr]],
    []
  )
  //console.log(optMatrix)

  let sortedOptions = optMatrix.sort((a, b) => (a[1] < b[1] ? 1 : -1))
  //console.log(sortedOptions)
  sortedOptions = sortedOptions.reduce((acc, curr) => [...acc, curr[0]], [])
  //console.log(sortedOptions)
  return sortedOptions
}

module.exports = {
  seleneFunction: seleneFunction
}

//schifo
/*
  let clone = [...question.options]

  //it seems to be anumber that's not lower than or equal to onother while not being greater than it
  let sortedOptions = question.options.sort((a, b) => {
    if (gMedia[clone.indexOf(a)] < gMedia[clone.indexOf(b)]) {
      return 1
    }

    if (gMedia[clone.indexOf(a)] > gMedia[clone.indexOf(b)]) {
      return -1
    }

    return 0
  })
  */
//variations... I'll not return the percentage
/*question.rooted = clone.reduce(
    (acc, curr) => [...acc, curr ** 0.5],
    []
  )*/
