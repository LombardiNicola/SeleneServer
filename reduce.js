let arr = [1, 2, 3, 4, 5, 6, 7]

let average = arr.reduce((acc, curr) => acc + curr, 0) / arr.length

console.log(average)

let squares = arr.reduce((acc, curr) => {
  acc.push(curr ** 2)
  return acc
}, [])

console.log(squares)

const filter = (arr, f) =>
  arr.reduce((acc, curr) => (f(curr) ? [...acc, curr] : acc), [])
const map = (arr, f) => arr.reduce((acc, curr) => [...acc, f(curr)], [])
