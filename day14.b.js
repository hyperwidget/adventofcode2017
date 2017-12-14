const test1 = `flqrgnkx`
const test1Result = 1242

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
  let total = 0
  let grid = []
  let uuid = 2

  // Generate the grid
  for (let x = 0; x < 128; x++) {
    grid.push([])
    const hashed = hash(`${val}-${x}`)
    hashed.split('').map(char => {
      const binary = ('00000' + parseInt(char, 16).toString(2)).slice(-4)
      binary.split('').map((val, y) => grid[x].push(+val))
    })
  }

  const connect = (rowIndex, columnIndex, uuid) => {
    const up = rowIndex - 1
    const down = rowIndex + 1
    const left = columnIndex - 1
    const right = columnIndex + 1

    if (grid[rowIndex][right] && grid[rowIndex][right] === 1) {
      grid[rowIndex][right] = uuid
      connect(rowIndex, right, uuid)
    }
    if (grid[rowIndex][left] && grid[rowIndex][left] === 1) {
      grid[rowIndex][left] = uuid
      connect(rowIndex, left, uuid)
    }
    if (grid[up] && grid[up][columnIndex] === 1) {
      grid[up][columnIndex] = uuid
      connect(up, columnIndex, uuid)
    }
    if (grid[down] && grid[down][columnIndex] === 1) {
      grid[down][columnIndex] = uuid
      connect(down, columnIndex, uuid)
    }
  }

  grid.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column === 1) {
        grid[rowIndex][columnIndex] = uuid
        connect(rowIndex, columnIndex, uuid)
        uuid++
      }
    })
  })

  return uuid - 2 // Minus 2 because that's where I started the uuids @
}

if (day14(test1) == test1Result) console.log('test1 pass')

const retVal = day14(input)
console.log(retVal)
