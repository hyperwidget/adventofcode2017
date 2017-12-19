const test1 = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`
const test1Result = 3

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

const getNumericValue = (register, key) => {
  let num = isNaN(key)
    ? registers[register][key] ? registers[register][key] : 0
    : key
  return +num
}

const commands = {
  snd: (register, val) => {
    queues[+!register].push(getNumericValue(register, val))
    dones[+!register] = false
    if (register === 1) {
      sentCount++
    }
    index[register]++
  },
  set: (register, key, val) => {
    registers[register][key] = getNumericValue(register, val)
    index[register]++
  },
  add: (register, key, val) => {
    commands.set(
      register,
      key,
      getNumericValue(register, key) + getNumericValue(register, val)
    )
  },
  mul: (register, key, val) => {
    commands.set(
      register,
      key,
      getNumericValue(register, key) * getNumericValue(register, val)
    )
  },
  mod: (register, key, val) => {
    commands.set(
      register,
      key,
      getNumericValue(register, key) % getNumericValue(register, val)
    )
  },
  rcv: (register, key) => {
    if (queues[register].length === 0) {
      dones[register] = true
      if (dones[0] && dones[1]) {
        done = true
      }
    } else {
      registers[register][key] = queues[register].shift()
      index[register]++
    }
  },
  jgz: (register, key, val) => {
    let jumpVal = getNumericValue(register, key)
    if (getNumericValue(register, key) > 0) {
      index[register] += getNumericValue(register, val)
    } else {
      index[register]++
    }
  }
}
let registers = [{ p: 0 }, { p: 1 }]
let index = [0, 0]
let dones = [false, false]
let done = false
let queues = [[], []]
let register = 0
let sentCount = 0

const day18 = val => {
  const instructions = val.split('\n')
  while (!done) {
    if (!dones[register]) {
      const command = instructions[index[register]].split(' ')
      commands[command[0]](register, command[1], command[2])
    }
    register = +!register
  }

  return sentCount
}

// if (day18(test1) == test1Result) console.log('test1 pass')

const retVal = day18(input)
console.log(retVal)
