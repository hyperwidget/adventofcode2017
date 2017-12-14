const test1 = `0: 3
1: 2
4: 4
6: 4`
const test1Result = 24

const input = `0: 5
1: 2
2: 3
4: 4
6: 8
8: 4
10: 6
12: 6
14: 8
16: 6
18: 6
20: 12
22: 14
24: 8
26: 8
28: 9
30: 8
32: 8
34: 12
36: 10
38: 12
40: 12
44: 14
46: 12
48: 10
50: 12
52: 12
54: 12
56: 14
58: 12
60: 14
62: 14
64: 14
66: 14
68: 17
70: 12
72: 14
76: 14
78: 14
80: 14
82: 18
84: 14
88: 20`

const day13 = val => {
  const rows = val.split('\n')
  let layerData = {}
  rows.map(row => {
    rowData = row.split(': ')
    //Create datamap
    layerData[rowData[0]] = {
      range: rowData[1],
      currentDirection: 'down',
      severityCost: rowData[0] * rowData[1]
    }
  })

  const maxlayer = rows[rows.length - 1].split(':')[0]
  let currentPosition = -1
  let totalSeverity = 0
  let scannerState = []

  //Create scannerState
  for (let i = 0; i <= maxlayer; i++) {
    if (layerData[i]) {
      scannerState.push(1)
    } else {
      scannerState.push(0)
    }
  }

  //Iterate through until done
  for (let i = 0; i <= maxlayer; i++) {
    //Move current position
    currentPosition++
    if (scannerState[currentPosition] === 1) {
      totalSeverity += layerData[i].severityCost
    }

    //Move scanner positions
    Object.keys(layerData).map(key => {
      currentLayer = layerData[key]
      changevalue = currentLayer.currentDirection === 'down' ? 1 : -1
      scannerState[key] += changevalue

      if (scannerState[key] === 1) {
        layerData[key].currentDirection = 'down'
      } else if (scannerState[key] == currentLayer.range) {
        layerData[key].currentDirection = 'up'
      }
    })
  }

  return totalSeverity
}

if (day13(test1) == test1Result) console.log('test1 pass')

const retVal = day13(input)
console.log(retVal)
