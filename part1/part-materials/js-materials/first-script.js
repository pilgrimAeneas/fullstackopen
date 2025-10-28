// let and const make sure lexical scoping is done correctly and within all blocks.
const x = 1 // for constant definitions
let y = 5 // for variable definitions

// In iterations, using let and const means that each iteration is its own scope.
// So closures formed in each iteration, can't be mutated by the iteration advancing.
for (let i = 0; i < 5; i++) {
    // setTimeout(() => console.log(i))
}
// Using var ruins that, making all iteration use the same scope and i.
// Only use const and let!

// This array's reference is defined as the constant called t, but it still
// can have its contents changed as they are themselves not immutable or constant.
const t = [1, 2, 3]

// Higher-order and immutable programming techniques are preferred using React:
// Use concat instead of push, to avoid mutating original array.
const t2 = t.concat([4, 5])

// Another higher order function as an array method is map.
// This is used quite often in React for Functional Programming reasons and else.
const m1 = t.map(value => '<li>' + value + '</li>')
// console.log(m1)

// JavaScript has pattern matching / destructuring
const [li1, li2, ...rest] = m1

// Objects / Structs
const object1 = {
    name: 'Arty Hellas',
    age: 35,
    education: 'PhD',
}

const object2 = {
    name: {
        first: 'Dan',
        last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}

// console.log(object1)
// console.log(object2.name)
// console.log(object2.grades)
// console.log(object2.department)

// We can also have methods, but it's unnecessary. JavaScript also does not 
// have OOP classes in the same way as other OOP languages do. 
// Only still has its syntax, to mimic it in some way.

// Treat objects like Racket's structs!

// In this course we use "this-less" JavaScript

// Destructuring in objects: use the name of the key alone, or key:chose_identifier
const { name, education: education1 } = object1
const { age } = object1
// console.log(name, age, education1)

const [a1, b1, ...{ length }] = [1, 2, 3]
// console.log(a1, b1, length)

const obj = { a: 1, b: { c: 2 } }
const {
    a,
    b: { c: d },
} = obj
// Two variables are bound: `a` and `d`

// Functions

const square1 = (p1) => {
    return p1 * p1
}

const square2 = p => {
    console.log(p)
    return p * p
}

const square3 = p => p * p

const tSquared1 = t.map(p => p * p)
const tSquared2 = t.map(square1)
// console.log(tSquared1)
// console.log(tSquared2)

// Function declaration and function expressions are irrelevant to us.
// Use only lambda expressions also known as arrow syntax, same with let and const.

// In JavaScript closures can have their internal data mutated
let x1 = 4
const f1 = (v) => x1 + v
// console.log(f1(1))

x1 = 5
// console.log(f1(1))
// console.log(this)

// This is because object environments which are passed to the closure when it's defined
// are mutable objects, and mutating them anywhere is the same as mutating the original
// object environment which was passed to the closure and potentially another closures.

// env1 is passed to closure1
// env1 is passed to closure2
// return closures 1 and 2
// now mutate variable in env1
// both closures 1 and 2 will have the variable mutated in their environments
// which are references to env1, an object.

// This is how it works in my interpreter, in racket and scheme, and in JavaScript.

// EXTRAS -------------------

const obj1 = new Object();
obj1.hello = "Hey there";

const obj2 = Object.create(obj1);
console.log(obj2.hello)
console.log(Object.getPrototypeOf(obj2))

const spider = {
    web: "",
    makeWeb() {
        this.web += "web";
        return this;
    }
}

const spiderSon = Object.create(spider)
spiderSon.web = "webwebalready"

spiderSon.makeWeb().makeWeb().makeWeb().makeWeb()
console.log(spiderSon.web)

// strings are primitives and immutable.
let s1 = "Hello";
let s2 = s1;
s1 = "Nope"
console.log(s1)
console.log(s2)
// each is pointing to its own version. (not really, but it's immutable so it doesn't matter)

// Objects on the other hand, are mutable and in heap so they work as expected from references.

// Basically we have primitives that are stored in stack and are immutable.
// Anything else, however, is an object that is in heap and is mutable and referenced.

const spider1 = Object.create(spider) // inherit from spider
const spider2 = Object.assign(spider) // clone the properties of spider (only enumerable)
const spider3 = spider                // another reference to spider object

// assign doesn't recursively deep copy, and doesn't copy inherited or non-internal properties
// assign might generally be replace by a more preferable spread syntax. especially when
// deep copying multiple objects into one.

const spider4 = {
    ...spider,
    ...obj1,
}

console.log(spider4)

// avoid (for-in) as it takes into consideration enumerable objects, not internal.
// instead get the keys, values, or entries as a list then iterate on them with for-of.
for (const [k, v] of Object.entries(spider4)) {
    console.log(k, v)
}

// to create a constructor
function Person(name) {
    this.name = name;
}

// to use the constructor
const p1 = new Person("Moon")
console.log(p1)

// Basically no matter how an object is created, it's a inherited object, from
// either the global empty object, or any other. Then more properties can be defined for it.
// To use class syntax or function Object1 and the new keyword, is to use syntactic sugar
// for object creation including inheriting and extra properties definition.

// The low level or basic level is Object.create('inherit from here')
// Then assigning more properties as needed.

// This can be done by literals, functions, constructors, or class syntax.
