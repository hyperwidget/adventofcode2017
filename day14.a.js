const test1 = `flqrgnkx`
const test1Result = 8108

const input = `ljoxqyyw`

const hash = val => {
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

const generateList = amount => {
  let arr = []
  for (let i = 0; i < amount; i++) {
    arr.push(i)
  }
  return arr
}

const day14 = val => {
  const iterator = Array.apply(null, { length: 128 }).map(Number.call, Number)
  return iterator.reduce(
    (sum, index) =>
      sum +
      hash(`${val}-${index}`)
        .split('')
        .reduce(
          (sum, char) =>
            sum +
            ('00000' + parseInt(char, 16).toString(2))
              .slice(-4)
              .split('')
              .reduce((sum, val) => sum + +val, 0),
          0
        ),
    0
  )
}

if (day14(test1) == test1Result) console.log('test1 pass')

const retVal = day14(input)
console.log(retVal)
