// Based on https://chrisrng.svbtle.com/lru-cache-in-javascript
class LRUNode {
  constructor(key, value) {
    if (typeof key === 'undefined' || key === null) {
      throw 'Cannot have an undefined or null key for a LRUNode'
    }
    if (typeof value === 'undefined' || value === null) {
      throw 'Cannot have an undefined or null value for a LRUNode'
    }
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

export default class LRU {
  constructor(limit) {
    this.size = 0
    if (typeof limit === 'number') {
      this.limit = limit
    } else {
      this.limit = 10
    }
    this.map = {}
    this.head = null
    this.tail = null
  }

  setHead(node) {
    node.next = this.head
    node.prev = null
    if (this.head !== null) {
      this.head.prev = node
    }
    this.head = node
    if (this.tail === null) {
      this.tail = node
    }
    this.size++
    this.map[node.key] = node
  }

  set(key, value) {
    const node = new LRUNode(key, value)
    if (this.map[key]) {
      this.map[key].value = node.value
      this.remove(node.key)
    } else {
      if (this.size >= this.limit) {
        delete this.map[this.tail.key]
        this.size--
        this.tail = this.tail.prev
        this.tail.next = null
      }
    }
    this.setHead(node)
  }

  get(key) {
    if (this.map[key]) {
      const value = this.map[key].value
      const node = new LRUNode(key, value)
      this.remove(key)
      this.setHead(node)
      return value
    } else {
      // console.log('Key ' + key + ' does not exist in the cache.')
      return null // Return null because null cannot be a LRUNode value
    }
  }

  remove(key) {
    const node = this.map[key]
    if (node.prev !== null) {
      node.prev.next = node.next
    } else {
      this.head = node.next
    }
    if (node.next !== null) {
      node.next.prev = node.prev
    } else {
      this.tail = node.prev
    }
    delete this.map[key]
    this.size--
  }

  removeAll(limit) {
    this.size = 0
    this.map = {}
    this.head = null
    this.tail = null
    if (typeof limit === 'number') {
      this.limit = limit
    }
  }

  forEach(callback) {
    let node = this.head
    let i = 0
    while (node) {
      callback(node, i)
      i++
      node = node.next
    }
  }
}
