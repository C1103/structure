// Function.prototype.call1 = function (context) {
//     context.fn = this
//     context.fn()
//     delete context.fn
// }

// var foo = {
//     value: 1
// }

// function bar () {
//     console.log(this.value)
// }

// bar.call1(foo)

// Function.prototype.call2 = function (context) {
//     console.log(context, arguments)
//     context.fn = this
//     var args = []
//     for (var i = 1, len = arguments.length; i < len; i++) {
//         args.push(arguments[i])
//     }
//     context.fn(...args)
//     delete context.fn
// }

// var foo = {
//     value: 1
// }

// function bar (name, age) {
//     console.log(name)
//     console.log(age)
//     console.log(this.value)
// }

// bar.call2(foo, 'YM', 18)


Function.prototype.call3 = function (context) {
  var context = context || global
  context.fn = this
  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
      args.push(arguments[i])
  }
  var result = context.fn(...args)
  
  delete context.fn
  return result
}

value = 2

var obj = {
  value: 1
} 

function bar (name, age) {
  console.log(this.value)
  return {
      value: this.value,
      name: name,
      age: age
  }
}

bar.call3(null)
console.log(bar.call3(obj, 'YM', 18))
