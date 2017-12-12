const test1 = 1
const test1Result = 0
const test2 = 25
const test2Result = 3
const test3 = 23
const test3Result = 2
const test4 = 1024
const test4Result = 31

const input = 312051

// 1 = right, 2 = up, 3 = left, 4 = down
const DIRECTIONS = [1, 2, 3, 4]

const nextDirection = currentDirection =>
  currentDirection % DIRECTIONS.length + 1

const day3 = (val, max) => {
  let coords = [[1]]
  let xCoord = 0
  let yCoord = 0
  let homeX = 0
  let homeY = 0
  let currentDirection = DIRECTIONS[0]
  let seekVal

  if (val === 1) {
    return 0
  }

  const getSumOfSurrounding = (x, y) => {
    let sum = 0
    let left = coords[x][y - 1] ? coords[x][y - 1] : 0
    let right = coords[x][y + 1] ? coords[x][y + 1] : 0
    let up = coords[x - 1] && coords[x - 1][y] ? coords[x - 1][y] : 0
    let down = coords[x + 1] && coords[x + 1][y] ? coords[x + 1][y] : 0
    let upLeft =
      coords[x - 1] && coords[x - 1][y - 1] ? coords[x - 1][y - 1] : 0
    let upRight =
      coords[x - 1] && coords[x - 1][y + 1] ? coords[x - 1][y + 1] : 0
    let downLeft =
      coords[x + 1] && coords[x + 1][y - 1] ? coords[x + 1][y - 1] : 0
    let downRight =
      coords[x + 1] && coords[x + 1][y + 1] ? coords[x + 1][y + 1] : 0

    return left + right + up + down + upLeft + upRight + downLeft + downRight
  }

  // Create Spiral
  for (let i = 2; i <= val; i++) {
    let currentCoords = coords[xCoord][yCoord]

    switch (currentDirection) {
      case 1:
        // console.log('MOVING RIGHT')
        yCoord++
        num = getSumOfSurrounding(xCoord, yCoord)
        if (num > max) return num
        coords[xCoord][yCoord] = num

        // Check if direction change is needed
        if (
          coords[xCoord - 1] === undefined ||
          coords[xCoord - 1][yCoord] === undefined
        ) {
          currentDirection = nextDirection(currentDirection)
        }
        break
      case 2:
        // console.log('MOVING UP')
        xCoord--
        if (xCoord === -1) {
          coords.unshift([])
          xCoord++
        }
        num = getSumOfSurrounding(xCoord, yCoord)
        if (num > max) return num
        coords[xCoord][yCoord] = num

        // Check if direction change is needed
        if (coords[xCoord][yCoord - 1] === undefined) {
          currentDirection = nextDirection(currentDirection)
        }
        break
      case 3:
        // console.log('MOVING LEFT')
        yCoord--
        num = getSumOfSurrounding(xCoord, yCoord)
        if (num > max) return num

        if (coords[xCoord].includes(undefined)) {
          coords[xCoord][yCoord] = num
        } else {
          coords[xCoord].unshift(num)
          yCoord++

          // since we added a new column on the left, we need to ensure that a new one is added to all the others
          for (let i = xCoord + 1; i < coords.length; i++) {
            coords[i].unshift(undefined)
          }
        }

        // Check if direction change is needed
        if (coords[xCoord + 1][yCoord] === undefined) {
          currentDirection = nextDirection(currentDirection)
        }
        break
      case 4:
        // console.log('MOVING DOWN')
        xCoord++
        if (coords[xCoord] === undefined) {
          coords[xCoord] = Array(coords[xCoord - 1].length)
        }
        num = getSumOfSurrounding(xCoord, yCoord)
        if (num > max) return num
        coords[xCoord][yCoord] = num

        // Check if direction change is needed
        if (coords[xCoord][yCoord + 1] === undefined) {
          currentDirection = nextDirection(currentDirection)
          // If a change is needed, it means that we also are in the bottom right, and should add an item to the other rows to make it square
          for (let i = xCoord; i > -1; i--) {
            coords[i].push(undefined)
          }
        }
        break
      default:
        break
    }
  }

  // Manhattan it
  for (let i = 0; i < coords.length; i++) {
    const row = coords[i]
    found = row.indexOf(1)

    if (found !== -1) {
      homeX = i
      homeY = found
      i = coords.length
    }
  }

  let x = [homeX, xCoord].sort()
  let y = [homeY, yCoord].sort()

  console.log(coords)

  // return x[1] - x[0] + (y[1] - y[0])
}

const retVal = day3(input, input)
console.log(retVal)
