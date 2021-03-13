/* In java we studied that array is a collection of homegeneous data types but in 
   JS, an array is a collection of anything. In reality, there is no array, it is an emulated feature. 
*/

let arr = [
    1,
    1.1,
    "ahraz",
    null,
    true,
    {
        firstName: "Ahraz",
        lastName: "Arfi",
    },
    [1,2,2,3,4],
    function sayhi() {
        console.log("Hello ahraz");
        return "Hello from inner sayhi"
    }
]

// get
console.log(arr[0]);
console.log(arr[5]);
console.log(arr[5]());

/* addLast -> push 
   removeLast -> pop
   addFirst -> unshift
   removeFirst -> shift


*/
console.log(arr.splice);
console.log("'''''''''''''''''''''''''''''''''''''''");