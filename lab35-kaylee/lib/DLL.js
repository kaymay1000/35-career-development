'use strict';

const Node = function(val, next=null, prev=null) {
  this.val = val;
  this.next = next;
  this.prev = prev;
};

const DLL = module.exports = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

DLL.prototype.append = function(val) {
  if(!val) throw new Error('Please provide a value');
  if(!this.head) return this.head = this.tail = new Node(val);

  this.head.next = new Node(val);
  this.head = this.head.next;
  return this.head;
};

DLL.prototype.prepend = function(val) {
  if(!val) throw new Error('Please provide a value');
  if(!this.tail) return this.tail = this.head = new Node(val);

  this.tail.prev = new Node(val);
  this.tail = this.tail.prev;
  return this.tail;
};

DLL.prototype.remove = function(val) {
  if(!val) throw new Error('Please provide a value');
  if(!this.tail) throw new Error('This list is empty');
};
