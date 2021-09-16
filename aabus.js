

class AABus {

  constructor() {
    this.question = {}
  }

  ask() {

  }

  askEveryOne(id, info, answer) {
    if (typeof info === 'function') {
      answer = info
    }
    const acks = this.question[id]
    if (acks && acks.length) {
      for (const ack of acks) {
        ack(info, result => answer(result))
      }
    } else {
      answer();
    }
  }

  askOneByOne(id, payload, ) {

  }

  askAll(id) {


  }

  askRace(id) {

  }

  // 注册应答
  answer(id, ack) {
    this.question[id] = this.question[id] || []
    this.question[id].push(ack)
  }

}

var aaBus = new AABus()

var aaBus = new AABus()

aaBus.answer('test', (info, done) => {
  setTimeout(() => done(1), 2000)
})

aaBus.answer('test', (info, done) => {
  setTimeout(() => done(2), 1000)
})

aaBus.answer('test', (info, done) => {
  setTimeout(() => done(3), 3000)
})

aaBus.askEveryOne('test', data => {
  console.log(data)
})

