const test1 = `0	2	7	0`
const test1Result = 5

const input = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`

const findHighestIndex = values => {
  let currentHighestIndex = 0
  let currentHighestVal = values[0]
  for (let i = 1; i < values.length; i++) {
    if (values[i] > currentHighestVal) {
      currentHighestVal = values[i]
      currentHighestIndex = i
    }
  }
  return currentHighestIndex
}

redistributeBucketVals = (values, startingIndex, amount) => {
  let redistributed = [...values]
  let nextIndex = (startingIndex + 1) % values.length

  while (amount > 0) {
    redistributed[nextIndex] += 1
    amount--
    nextIndex = (nextIndex + 1) % values.length
  }

  return redistributed
}

const day6 = val => {
  const splitValues = val.split('	')
  const values = splitValues.map(val => +val)
  let changingValues = [...values]
  let history = [values]
  let done = false
  let stepCount = 1

  while (!done) {
    let highestBucket = findHighestIndex(changingValues)
    let valToRedistribute = changingValues[highestBucket]
    changingValues[highestBucket] = 0
    changingValues = redistributeBucketVals(
      changingValues,
      highestBucket,
      valToRedistribute
    )

    for (let i = 0; i < history.length; i++) {
      const element = history[i]

      if (JSON.stringify(changingValues) == element) {
        done = true
        i = history.length
      }
    }
    if (!done) {
      history.push(JSON.stringify(changingValues))
      stepCount++
    }
  }

  return stepCount
}

const retVal = day6(input)
console.log(retVal)
