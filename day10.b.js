const test1 = ``
const test1Result = `a2582a3a0e66e6e86e3812dcb672a272`
const test2 = `AoC 2017`
const test2Result = `33efeb34ea91902bb2f59c9920caa6cd`
const test3 = `1,2,3`
const test3Result = `3efbe78a8d82f29979031a4aa0b16a9d`
const test4 = `1,2,4`
const test4Result = `63960835bcdc130f0b66d7ff4f6a5a8e`

const input = `31,2,85,1,80,109,35,63,98,255,0,13,105,254,128,33`

const generateList = amount => {
  let arr = []
  for (let i = 0; i < amount; i++) {
    arr.push(i)
  }
  return arr
}

const day10 = val => {
  const parsed = val.split('').map(item => item.charCodeAt(0))
  const fullParse = [...parsed, 17, 31, 73, 47, 23]
  const maxPlace = 256
  let list = generateList(maxPlace)
  let skipCounter = 0
  let currentIndex = 0

  for (let i = 0; i < 64; i++) {
    fullParse.forEach(segmentLength => {
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
      skipCounter++
    })
  }

  // We should be at the sparseHash now???
  let blocks = []
  for (let i = 0; i < 16; i++) {
    blocks.push(list.slice(i * 16, i * 16 + 16))
  }

  let xord = []
  blocks.forEach(block => {
    xord.push(block.reduce((sum, current) => sum ^ current))
  })

  return xord
    .map(val =>
      Number(val)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')
}

if (day10(test1) == test1Result) console.log('test1 pass')
if (day10(test2) == test2Result) console.log('test2 pass')
if (day10(test3) == test3Result) console.log('test3 pass')
if (day10(test4) == test4Result) console.log('test4 pass')

const retVal = day10(input)
console.log(retVal)
