// var
// var can be redeclared, this was changed in 2015 with the intro of let keyword which cant be redeclared.

/* var a;
console.log(a);
var a;
a = 10;
console.log(10.1); */

//////////////////////////////////////////////////////

//let -> cant be redeclared, we cant access before declaration
// introduced in 2015
// let is blocked scope, i.e., you can declare same variable in different blocks




///////////////////////////////////////////////

// block scope =>

{
    let a = 10;
    console.log(a);
    {
        let a = 20;
        console.log(a);
    }
    // let a; //this will give error as a is declared in this block before.
    console.log(a);
}


///////////////////////////////////

/* 
const -> exactly behaves like let but it stores value/ address of the variable
*/

/* even though const declares as constant but we can manipilate content s of an array even if the array is declared as a constant ??? reason? */

const a = [10, 20];
console.log(a);
a[0] = 30; //legal
// a = [30,20]; //illegal, since its declared as constant
console.log(a);

// in JS, objects are adapted as arrays.

//////////////////////////////////////////////////


// functions
/* 
in JS, functions are also treated as variables? how is it possible?
We can assign address of a function to a variable
*/
// function type
// function expression
let varName = function fn() { // varName is storing the address of fn()
    console.log("I am ahraz");
}
console.log(varName);
varName();


function fn1() {
    console.log("I am func");
}

function fn1() {
    console.log("I am fake");;
}

fn1(); // the second function will be executed as JS functions are treated as variables so the function is just re defined and the previous one is overidden.If this happens in a large codebase, then it will be very cumbersome to resolve this error.

/* 
to resolve this issue we can assign the function to a variable using let keyword, which prohibits re-declaring or re-defining a variable (read: function, solution is below:) 
*/

let abc = function fa() {
    console.log("Hello");
}

let abc = function fa() {
    console.log("Fake Hello"); // this will give an error, thus preventing re declaration
}

fa();

////////////////////////////////////////////////////////////

// Immediately invoked function expression (IIFE)

(function () {
    console.log("IIFE");
})();
console.log("After IIFE");

//////////////////////////////////////////////////////

// Strings
// immutable
let sName = "ahraz";
let aa = 'I am single quotes string';
let bb = "I am double quotes string";
console.log("single", a);
console.log("double", b);

//template string or multiline string
let cc = `I am back
${varName} string`;

// GEC and TDZ