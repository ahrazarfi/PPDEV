// input
let input = process.argv.slice(2);
// node mycli.js view <dirname> tree
// node mycli.js view <dirname> flat
// node mycli.js organize <dirname>
// node mycli.js help



let cmd = input[0];
switch(cmd) {
    case "view" :

    view(dirpath, mode)
        // console.log("view command implemented");
        break;
    case "organize":
        console.log("organize command implemented");
        break;
    case "help":
        console.log("List of all commands: ");
        console.log("1. node mycli.js <dirname> tree");
        console.log("2. node mycli.js <dirname> flat");
        console.log("3. node mycli.js organize <dirname>");
        break;
    default:
        console.log("Wrong command :( type help to see the list of all commands)");



}


