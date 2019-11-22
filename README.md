# mcJSON

mcJSON is a cli for generating mcfunction files from json files.

Every json file has to be an array with at least one object. This object is called the main node and has to properties:

- path : the path for the mcfunction to generate (relative to location of the json file but inside the functions folder)
- nodes : child nodes to generate

## Child nodes

Every node has at least two properties:

- type : the type of the node (command, as, positioned, if) (string / required)
- args : arguments for the node (string / array of strings or objects)
- nodes : child nodes (string / object (node) / array of strings or objects (nodes))

If a node is just a string it is interpreted as a command node.
