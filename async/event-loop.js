const { readFile, readFileSync } = require('fs')

setImmediate(() => console.log('[阶段3.immediate] 1'))
setImmediate(() => console.log('[阶段3.immediate] 2'))
setImmediate(() => console.log('[阶段3.immediate] 3'))

Promise.resolve().then(() => {
  console.log('[...带切入下一阶段] promise 回调1')

  setImmediate(() => console.log('[阶段3.immediate] promise 回调1 增加的immediate 回调4'))
})

readFile('../package.json', 'utf-8', data => {
  console.log('[阶段2...IO回调] 读文件 回调1')
  readFile('../server', 'utf-8', data => {
    console.log('[阶段2...IO回调] 读文件 回调2')

    setImmediate(() => {
      console.log('[阶段3.immediate] 读文件 回调2 增加的immediate 回调4')
    })
  })
  setImmediate(() => {
    console.log('[阶段3.immediate] immediate 回调4')

    Promise.resolve().then(() => {
      console.log('[...带切入下一阶段] promise 回调2')
      process.nextTick(() => console.log('[...带切入下一阶段] promise 回调2 增加的 nexttick 回调5'))
    })
    .then(() => {
      console.log('[...带切入下一阶段] promise 回调3')
    })
  })
  setImmediate(() => {
    console.log('[阶段3.immediate] immediate 回调5')

    process.nextTick(() => console.log('[...带切入下一阶段] promise 回调2 增加的 nexttick 回调6'))
    console.log('[...带切入下一阶段] 这块正在同步阻塞的读一个大文件')
    const server = readFileSync('../server/index.js', 'utf-8')
    process.nextTick(() => console.log('[...带切入下一阶段] promise 回调2 增加的 nexttick 回调7'))
    readFile('../package.json', 'utf-8', data => {
      console.log('[阶段2...IO回调] 读文件回调2')

      setImmediate(() => {
        console.log('[阶段3.immediate] 读文件 回调2 增加的immediate 回调6')
      })
      setTimeout(() => console.log('[阶段1 定时器 回调1'), 8)
    })
  })

  process.nextTick(() => {
    console.log('[...带切入下一阶段] 读文件回调1 nexttick 回调6')
  })

  setTimeout(() => console.log('[阶段1 定时器 回调6'), 0)
  setTimeout(() => console.log('[阶段1 定时器 回调7'), 0)
})

setTimeout(() => console.log('[阶段1 定时器 回调1'), 0)
setTimeout(() => {
  console.log('[阶段1 定时器 回调2')

  process.nextTick(() => {
    console.log('[...带切入下一阶段] nexttick 回调2')
  })
}, 0)
setTimeout(() => console.log('[阶段1 定时器 回调3'), 0)
setTimeout(() => console.log('[阶段1 定时器 回调4'), 0)

process.nextTick(() => console.log('[...带切入下一阶段] nexttick 回调1'))
process.nextTick(() => {
  console.log('[...带切入下一阶段] nexttick 回调2')
  process.nextTick(() => console.log('[...带切入下一阶段] nexttick 回调4'))
})
process.nextTick(() => console.log('[...带切入下一阶段] nexttick 回调3'))

