const TEST1A = 65
const TEST1B = 8921
const test1Result = 588

const INPUTA = 116
const INPUTB = 299

const A_FACTOR = 16807
const B_FACTOR = 48271
const PRODUCT = 2147483647
const PAIR_COUNT_TARGET = 40000000
// const PAIR_COUNT_TARGET = 5

const day15 = (a, b) => {
  let aVal = a
  let bVal = b
  let totalMatch = 0
  for (let i = 0; i < PAIR_COUNT_TARGET; i++) {
    aVal = (aVal * A_FACTOR) % PRODUCT
    bVal = (bVal * B_FACTOR) % PRODUCT

    let aBinary = parseInt(aVal)
      .toString(2)
      .slice(-16)
    let bBinary = parseInt(bVal)
      .toString(2)
      .slice(-16)

    if (aBinary === bBinary) {
      totalMatch++
    }
  }
  console.log(totalMatch)
  return totalMatch
}

if (day15(TEST1A, TEST1B) == test1Result) console.log('test1 pass')

const retVal = day15(INPUTA, INPUTB)
console.log(retVal)
