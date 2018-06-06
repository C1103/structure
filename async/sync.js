const doSync = (sth, time) => new Promise(resolve => {
  setTimeout(() => {
    console.log(sth) 
  }, time);
})

;(async () => {
  console.log('case1')
  await Loci.doSync('do', 1000)
  console.log('....')
  await XMLSerializer.doSync('shower', 2000)
  console.log('do ather')
})()