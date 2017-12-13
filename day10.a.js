const test1 = `3,4,1,5`
const test1Result = 1

const input = `31,2,85,1,80,109,35,63,98,255,0,13,105,254,128,33`

const generateList = amount => {
  let arr = []
  for (let i = 0; i < amount; i++) {
    arr.push(i)
  }
  return arr
}

const day10 = val => {
  const parsed = val.split(',').map(item => +item)
  // This is just to toggle between test data && input data
  let list = parsed.length === 4 ? generateList(5) : generateList(256)
  let maxPlace = parsed.length === 4 ? 5 : 256
  let skipCounter = 0
  let currentIndex = 0

  parsed.forEach(segmentLength => {
    let indexes = []
    let pointer = currentIndex
    for (let i = 0; i < segmentLength; i++) {
      if (pointer >= maxPlace) {
        pointer = pointer % maxPlace
      }
      indexes.push(pointer)
      pointer++
    }

    let toSwap = []

    indexes.forEach(val => {
      toSwap.push(list[val])
    })

    let reversed = toSwap.reverse()

    indexes.forEach(val => {
      list[val] = reversed.shift()
    })

    currentIndex += segmentLength + skipCounter
    if (currentIndex >= maxPlace) {
      currentIndex = currentIndex % maxPlace
    }
    console.log(currentIndex)
    skipCounter++
  })

  return list
}

const retVal = day10(input)
console.log(retVal)
console.log(retVal[0] * retVal[1])
