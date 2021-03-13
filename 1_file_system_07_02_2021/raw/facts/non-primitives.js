//function, arrays, objects

function hello(param){
    console.log("Greetins everyone with", param);
    let rval = Math.random()<0.5?"good":false;
    return rval; // will also work without terminating the return statement
}

hello("adios");
let rval = hello("namaskar");
console.log(rval);

/************************************************************** */

// object -> key:value

// empty object declaration
// cap america

let obj={
    name:"Steve",
    lastName:"Rogers",
    address: {
        city:"Manhattan",
        state: "New York"
    },
    isAvenger: false,
    age:45,
    movies: ["civil war", "first avenger", "age of ultron"],
    sayhi: function (param) {
        console.log("cap says namaskar", param);
        return "returns blessings"
    }
}

// get
let key = "address";
console.log("address object", obj.address);
console.log("address object", obj.address.state);
console.log("Movie", obj.movies[2]);


// function inside an object
console.log("function inside an object", obj.sayhi("Ahraz"));

// set -> update
console.log(obj);
console.log("''''''''''''''''''''''''''''''''''''''''''''''''''''");
obj.friends = ["ahraz","abid", "faraz"];
obj.age = 49;
obj[key]["state"] = "mumbai";
console.log(obj);

//delete
console.log(obj);
console.log("''''''''''''''''''''''''''''''''''''''''''''''''''''");
delete obj.movies;
console.log(obj);



// loop
for(let key in obj) {
    console.log("key :", key, "|value :", obj[key]);
}