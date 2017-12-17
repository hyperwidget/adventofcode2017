const input = 328

const day17 = val => {
  let locks = [0]
  let currentIndex = 0

  for (let i = 1; i <= 50000000; i++) {
    currentIndex = (currentIndex + val) % locks.length
    if (currentIndex !== 0) {
      locks.push(i)
    } else {
      locks = [].concat(
        locks.slice(0, currentIndex + 1),
        [i],
        locks.slice(currentIndex + 1)
      )
    }

    currentIndex++
  }

  return locks[1]
}

const retVal = day17(input)
console.log(retVal)
