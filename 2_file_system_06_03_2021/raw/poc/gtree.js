let root = {
    name: "d10",
    children: [
        {
            name: "d20",
            children: [
                {
                    name: "d50",
                    children: []
                }, {
                    name: "d60",
                    children: []
                }
            ]
        },
        {
            name: "d30",
            children: [
                {
                    name: "d70",
                    children: []
                }, {
                    name: "d80",
                    children: [
                        {
                            name: "d100",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "d40",
            children: [
                {
                    name: "d90",
                    children: []
                }
            ]
        }]
}

//generic tree should print the whole
// faith ??, base case??

function displayGtree(node) {
    // work
    let parentNChild = node.name + "=>";
    for(let i=0; i<node.children.length;i++){
        let child = node.children[i];
        parentNChild += child.name + ",";
    }

    console.log(parentNChild);
    // call -> and it will work like magic
    
    for(let i =0; i < node.children.length; i++){
        let child = node.children[i];
        displayGtree(child);
    }

}

displayGtree(root);