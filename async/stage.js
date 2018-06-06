const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const yy = new EE()

yy.on('event', () => {
  console.log('出大事了')
})

setTimeout(() => {
  console.log('0毫秒')
}, 0)

setTimeout(() => {
  console.log('100毫秒')
}, 100)

setTimeout(() => {
  console.log('200毫秒')
}, 200)

readFile('../package.json', 'utf-8', data => {
  console.log('完成1文件读取')
})

readFile('../README.md', 'utf-8', data => {
  console.log('完成2文件读取')
})

setImmediate(() => {
  console.log('立即回调')
})

process.nextTick(() => {
  console.log('process.nextTick')
})

Promise.resolve()
  .then(() => {
    yy.emit('event')

    process.nextTick(() => {
      console.log('process.nextTick 2')
    })
    console.log('promise 1')
  })
  .then(() => {
    console.log('promise 2')
  })