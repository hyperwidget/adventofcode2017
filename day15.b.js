const TEST1A = 65
const TEST1B = 8921
const test1Result = 309

const INPUTA = 116
const INPUTB = 299

const A_FACTOR = 16807
const B_FACTOR = 48271
const A_DIVISOR = 4
const B_DIVISOR = 8
const PRODUCT = 2147483647
const PAIR_COUNT_TARGET = 5000000
// const PAIR_COUNT_TARGET = 5

const day15 = (a, b) => {
  let aVal = a
  let bVal = b
  let aList = []
  let bList = []
  let totalMatch = 0

  while (aList.length < PAIR_COUNT_TARGET) {
    aVal = (aVal * A_FACTOR) % PRODUCT
    if (aVal % A_DIVISOR === 0) {
      aList.push(
        parseInt(aVal)
          .toString(2)
          .slice(-16)
      )
    }
  }

  while (bList.length < PAIR_COUNT_TARGET) {
    bVal = (bVal * B_FACTOR) % PRODUCT
    if (bVal % B_DIVISOR === 0) {
      bList.push(
        parseInt(bVal)
          .toString(2)
          .slice(-16)
      )
    }
  }

  for (let i = 0; i < PAIR_COUNT_TARGET; i++) {
    if (aList[i] === bList[i]) {
      totalMatch++
    }
  }

  return totalMatch
}

if (day15(TEST1A, TEST1B) == test1Result) console.log('test1 pass')

const retVal = day15(INPUTA, INPUTB)
console.log(retVal)
