import { Edge, MarkerType, Node } from 'reactflow';
import { CallTree, ClassInterface, Files, FunctionInterface } from '../../interfaces/interface';

const fileColor = 'rgba(100, 100, 100, 0.5)';
const classColor = 'rgba(150, 150, 150, 0.5)';
const functionColor = 'rgba(50, 50, 50, 1)';
const textColor = "white";

const boxStyle = {
    borderRadius: 12,
    color: textColor,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
}

export default function generateNodes(callTree: CallTree): { nodes: Node[], edges: Edge[] } {
    const nodes: Node[] = [];
   
    const functionInfoArray = new Map<string, FunctionInterface>();
    let x = 0;
    let y = 0;

    const margin = 30;
    let i = 0;
    let n = 0;

    let prevFunction = "";
    let files = callTree.tree;
    function findClassInterfaces(jsonObj: Files): ClassInterface[] {
        const classInterfaces: ClassInterface[] = [];

        for (const key in jsonObj) {
            if (typeof jsonObj[key] === "object") {
                const nestedObj = jsonObj[key] as Files | ClassInterface;
                if ("name" in nestedObj) {
                    const classInterface = nestedObj as ClassInterface;
                    classInterfaces.push(classInterface);
                } else {
                    const nestedClassInterfaces = findClassInterfaces(nestedObj);
                    classInterfaces.push(...nestedClassInterfaces);
                }
            }
        }

        return classInterfaces;
    }

    console.log("Files: " + files);
    const classInterfaces = findClassInterfaces(files);

    /*for (const key in files) {
        const file = files[key];
        const fileWidth = (400 - margin * 2);
        const fileHeight = Math.round(file.nrOfFunctions) * (50 + margin) + margin * 2;
        const fileX = x;
        const fileY = y;
        const nrOfClassesInFile = Object.keys(file.classes).length;
        const classColumns = Math.round(nrOfClassesInFile);
        const classes = file.classes;
        let classX = margin;
        let classY = margin;
        let j = 0;
        for (const key2 in classes) {
            const classItem = classes[key2];
            const nrOfFunctionsInClass = Object.keys(classItem.functions).length;
            const functionColumns = Math.round(nrOfFunctionsInClass);
            const functionRows = Math.round(nrOfFunctionsInClass);
            const classWidth = (340 - margin * 2);
            const classHeight = functionRows * (50 + margin);

            nodes.push({
                id: classItem.name,
                position: {
                    x: classX,
                    y: classY
                },
                data: {
                    label: classItem.name,
                    type: "class"
                },
                parentNode: file.fileName,
                style: {
                    backgroundColor: classColor,
                    width: classWidth,
                    height: classHeight,
                    border: '0.5px solid #e0e0e0',
                    ...boxStyle
                },
                type: 'resizableNode',
                zIndex: 0,
            })
            const functions = classItem.functions;
            let functionX = margin;
            let functionY = margin;
            let k = 0;
            for (const key3 in functions) {
                const functionItem = functions[key3];
                const functionName = functionItem.name;
                const functionId = functionItem.className + "#" + functionItem.name;
                nodes.push({
                    id: functionId,
                    data: {
                        label: functionName,
                        type: "function"
                    },
                    position: {
                        x: functionX,
                        y: functionY
                    },
                    parentNode: classItem.name,
                    connectable: false,
                    style: {
                        backgroundColor: functionColor,
                        ...boxStyle,
                    },
                    type: 'resizableNode',
                    zIndex: 2,
                })
                k++;
                n++;
                if (k % functionColumns === 0) {
                    functionX = margin;
                    functionX += 200 + margin;
                } else {
                    functionY += 50 + margin;
                }
            }
            j++;
            if (j % classColumns === 0) {
                classX = margin;
            } else {
                classY += classHeight + margin;
            }
        }
        i++;
        x += fileWidth + margin;

    }*/
    const functions = callTree.functions;
    enum edgeType {
        floating = "floating",
    }
    interface CustomEdge {
        id: string, // sorce + - + target
        source: string,
        target: string, 
        type: edgeType.floating,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        animated: boolean,
        style: {
            strokeWidth: 2,
        },
        zIndex: 1,
    }
    const edges: CustomEdge[] = [];

    // each function has a set of parents and children (functions that call it and functions it calls) and each functioncall should be an edge added to the edge array

    for (const key in functions) {
        const functionItem = functions[key];
        const functionId = `${functionItem.name}`;
       
        if (functionItem) {
            const parents = functionItem.parents;
            const children = functionItem.children;
            for (const key2 of parents) {
                const parent = functions[key2];
                if(!parent) continue;
                const parentId = `${parent.name}`;
                const edgeId = `${parentId}-${functionId}`;
                edges.push({
                    id: edgeId,
                    source: parentId,
                    target: functionId,
                    type: edgeType.floating,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                    animated: false,
                    style: {
                        strokeWidth: 2,
                    },
                    zIndex: 1,
                })
            }
            for (const key3 in children) {
                const child = functions[key3];
                if(!child) continue;
                const childId = `${child.name}`;
                const edgeId = `${functionId}-${childId}`;
                edges.push({
                    id: edgeId,
                    source: functionId,
                    target: childId,
                    type: edgeType.floating,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                    animated: false,
                    style: {
                        strokeWidth: 2,
                    },
                    zIndex: 1,
                })
            }
        }
    }

    console.log(edges);
    return { nodes, edges };
}
