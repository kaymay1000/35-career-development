'use strict'

const expect = require('chai').expect
const HashTable = require('../lib/hash-table.js')
const DLL = require('../lib/DLL.js')

describe('hash table tests', function() {
  describe('instantiating a new hash table', () => {
    it('should generate a new empty hash table', done => {
      let testHash = new HashTable()
      expect(testHash).to.not.be.null
      expect(testHash).to.be.instanceOf(Object, HashTable)
      done()
    })
    it('should have a default size of 8192', done => {
      let testHash = new HashTable()
      expect(testHash.buckets.length).to.equal(8192)
      done()
    })
    it('should create a new hash table with a specified size of 9600', done => {
      let testHash = new HashTable(9600)
      expect(testHash.buckets.length).to.equal(9600)
      done()
    })
  })
  describe('testing hashKey method', () => {
    it('should return a number', done => {
      let testHash = new HashTable()
      let expectHash = testHash.hashKey('test key')
      expect(expectHash).to.be.a('number')
      done()
    })
  })
  describe('testing set method', () => {
    it('should add a new key/value pair to the hash table', done => {
      let testHash = new HashTable()
      let expectKey = testHash.hashKey('I am a test key')
      testHash.set('I am a test key', 'test value')
      expect(testHash.buckets[expectKey].head.val).to.equal('test value')
      done()
    })
    it('should only contain specified key/value pair if no other key/value pairs exist', done => {
      let testHash = new HashTable()
      let expectKey = testHash.hashKey('I am the only one here')
      testHash.set('I am the only one here', 'yay')
      expect(testHash.buckets[expectKey].head.val).to.equal('yay')
      expect(testHash.buckets[expectKey].head.val).to.not.equal('blah')
      done()
    })
  })
  describe('testing get method', () => {
    it('should retrieve a value from the hash table by it\'s key', done => {
      let testHash = new HashTable()
      testHash.set('test key', 'test val')
      let expectVal = 'test val'
      let actualVal = testHash.get('test key')

      expect(expectVal).to.equal(actualVal.head.val)
      done()
    })
    it('should return a doubly linked list', done => {
      let testHash = new HashTable()
      testHash.set('test key', 'test val')
      let actualVal = testHash.get('test key')
      expect(actualVal).to.be.instanceOf(Object, DLL)
      done()
    })
  })
  describe('testing remove method', () => {
    it('should remove an item from the hash table', done => {
      let testHash = new HashTable()
      testHash.set('test key', 'test val')
      let expectKey = testHash.hashKey('test key')
      let expectVal = 'test val'
      let actualVal = testHash.get('test key')
      expect(expectVal).to.equal(actualVal.head.val)

      testHash.remove('test key')
      expect(testHash.buckets[expectKey]).to.be.undefined
      done()
    })
    it('should only remove specified key, and leave others intact', done => {
      let testHash = new HashTable()
      testHash.set('test key', 'test val')
      let expectKeyOne = testHash.hashKey('test key')
      let expectValOne = 'test val'
      let actualValOne = testHash.get('test key')
      expect(expectValOne).to.equal(actualValOne.head.val)
      testHash.set('another test key', 'another test val')
      let expectKeyTwo = testHash.hashKey('another test key')
      let expectValTwo = 'another test val'
      let actualValTwo = testHash.get('another test key')
      expect(expectValTwo).to.equal(actualValTwo.head.val)

      testHash.remove('test key')
      expect(testHash.buckets[expectKeyOne]).to.be.undefined
      expect(testHash.buckets[expectKeyTwo]).to.exist
      done()
    })
  })
})
