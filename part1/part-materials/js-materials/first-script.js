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
console.log(tSquared1)
console.log(tSquared2)

// Function declaration and function expressions are irrelevant to us.
// Use only lambda expressions also known as arrow syntax, same with let and const.

// In JavaScript closures can have their internal data mutated
let x1 = 4
const f1 = (v) => x1 + v
// console.log(f1(1))

x1 = 5
// console.log(f1(1))
