function HashTable() {
  var table = []

  this.put = function(key, value) {
    var position = loseloseHashCode(key)
    
    if (table[position] == undefined) {
      table[position] = new LinkedList()
    }
    table[position].append(new ValuePair(key, value))
  }
  this.getList = function(key) {
    var position = loseloseHashCode(key)
    var arr = []
    if (table[position] !== undefined) {
      var current = table[position].getHead()

      while(current) {
        arr.push(current.element.key)
        current = current.next
      }
      return arr
    }
  }
  this.get = function(key) {
    var position = loseloseHashCode(key)

    if (table[position] !== undefined) {
      var current = table[position].getHead()

      while(current.next) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }

      if (current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  }

  this.remove = function(key) {
    var position = loseloseHashCode(key)

    if (table[position] !== undefined) {
      
      var current = table[position].getHead()
      while(current.next) {
        if (current.element.key === key) {
          table[position].remove(current.element)
          if (table[position].isEmpty()) {
            table[position] = undefined
          }
          return true
        }
        current = current.next
      }
      
      if (current.element.key === key) {
        table[position].remove(current.element)
        if (table[position].isEmpty()) {
          table[position] = undefined
        }
        return true
      }
    }
    return false
  }
  this.getTable = function() {
    return table
  }
  var ValuePair = function(key, value) {
    this.key = key
    this.value = value

    this.toString = function() {
      return '[' + this.key + ' - ' + this.value + ']'
    }
  }


  var loseloseHashCode = function (key) {
    var hash = 0
    for (var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }
}

function LinkedList() {
  var Node = function(element) {
    this.element = element
    this.next = null
  }

  var length = 0
  var head = null
  this.append = function(element) {
    var node = new Node(element),current
    if (head === null) {
      head = node
    } else {
      current = head
      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    length++
  }

  this.remove = function(element) {
    var current = head, previous
    if (current.element === element) {
      head = current.next
      length--
    } else {
      previous = current
      current = current.next
      while (current) {
        if (current.element === element) {
          previous.next = current.next
          length--
        }
        previous = current
        current = current.next
      }
    }
  }

  this.getHead = function() {
    return head
  }
}

var hash = new HashTable()
hash.put('Gandalf', 'gandalf@email.com')
hash.put('John', 'john@email.com')
hash.put('Tyrion', 'tyrion@email.com')
hash.put('Aaron', 'aaron@email.com')
hash.put('Ana', 'ana@email.com')
hash.put('Jonathan', 'jonathan@email.com')
hash.put('Jamie', 'jamie@email.com')
hash.put('Sue', 'sue@email.com')
hash.put('Mindy', 'mindy@email.com')
hash.put('Paul', 'paul@email.com')
hash.put('Nathan', 'nathan@email.com')
console.log(hash.getTable())
console.log(hash.get('Tyrion'))
console.log(hash.getList('Sue'))