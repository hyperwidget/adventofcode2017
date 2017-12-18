const test1 = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`
const test1Result = 4

const input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 735
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`

const commands = {
  snd: key => {
    lastSound = registers[key]
    currentIndex++
  },
  set: (key, val) => {
    registers[key] = val
    currentIndex++
  },
  add: (key, val) => {
    commands.set(key, registers[key] + val)
  },
  mul: (key, val) => {
    commands.set(key, registers[key] * val)
  },
  mod: (key, val) => {
    commands.set(key, registers[key] % val)
  },
  rcv: () => {
    if (lastSound !== 0) done = true
  },
  jgz: (key, val) => {
    if (registers[key] && registers[key] > 0) {
      currentIndex += val
    } else {
      currentIndex++
    }
  }
}
let registers = {}
let currentIndex = 0
let lastSound
let done = false

const day18 = val => {
  const instructions = val.split('\n')
  while (!done) {
    const command = instructions[currentIndex].split(' ')
    const arg = isNaN(command[2])
      ? registers[command[2]] === undefined ? 0 : registers[command[2]]
      : +command[2]
    commands[command[0]](command[1], arg)
  }

  return lastSound
}

// if (day18(test1) == test1Result) console.log('test1 pass')

const retVal = day18(input)
console.log(retVal)
