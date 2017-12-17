const input = 328

const day17 = val => {
  let currentIndex = -1
  let currentAnswer = 0

  for (let i = 1; i <= 50000000; i++) {
    currentIndex = (currentIndex + val) % i
    if (currentIndex === 0) {
      currentAnswer = i
    }

    currentIndex++
  }

  return currentAnswer
}

const retVal = day17(input)
console.log(retVal)
