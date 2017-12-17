const test1 = 3
const test1Result = 638

const input = 328

const day17 = val => {
  let locks = [0]
  let currentIndex = 0

  for (let i = 1; i <= 2017; i++) {
    currentIndex = (currentIndex + val) % locks.length
    locks = [].concat(
      locks.slice(0, currentIndex + 1),
      [i],
      locks.slice(currentIndex + 1)
    )
    currentIndex++
  }

  return locks[currentIndex + 1]
}

if (day17(test1) == test1Result) console.log('test1 pass')

const retVal = day17(input)
console.log(retVal)
