'use strict'

let DLL = require('./DLL.js')

const HashTable = module.exports = function(size=8192) {
  this.size = size
  this.buckets = [...Array(this.size)]
  for(let i = 0; i < this.size; i++) {
    this.buckets[i] = new DLL()
  }
}

HashTable.prototype.hashKey = function(key) {
  if(!key) throw new Error('key required')
  let hash = key.split('').reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % this.size
  return hash
}

HashTable.prototype.set = function(key, value) {
  this.buckets[this.hashKey(key)].append(value)
}

HashTable.prototype.get = function(key) {
  return this.buckets[this.hashKey(key)]
}

HashTable.prototype.remove = function(key) {
  let address = this.hashKey(key)
  this.buckets[address] ? delete this.buckets[address] : new Error('invalid key')
}
