import { Edge, MarkerType, Node } from 'reactflow';
import { CallTree, ClassInterface, Files, FunctionInterface } from '../../interfaces/interface';

const fileColor = 'rgba(100, 100, 100, 0.5)';
const classColor = 'rgba(150, 150, 150)';
const functionColor = 'rgba(50, 50, 50, 1)';
const textColor = "white";

const boxStyle = {
    borderRadius: 12,
    color: textColor,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
}

export function generateNodes(callTree: CallTree, filter: string[], showUnConnectedNodes: boolean): Node[] {
    const nodes: Node[] = [];
    let x = 0;
    let y = 0;

    const margin = 10;
    let n = 0;

    function findClassDeclarations(callTree: CallTree): ClassInterface[] {
        const classes: ClassInterface[] = [];

        function findClassesInFiles(files: Files) {
            for (const child of Object.values(files.children)) {
                if (child.id != null && filter.includes(child.id)) {
                    continue;
                }
                if (child.type === 'class') {
                    classes.push(child as ClassInterface);
                } else if (child.type === 'package') {
                    findClassesInFiles(child as Files);
                }
            }
        }

        findClassesInFiles(callTree.tree);

        return classes;
    }

    const classInterfaces = findClassDeclarations(callTree);
    for (const classInterface of classInterfaces) {
        const classItem = classInterface;
        const functions = classItem.functions;
        const nrOfFunctionsInClass = Object.keys(functions).length;
        const functionColumns = Math.round(nrOfFunctionsInClass);
        const functionRows = Math.round(nrOfFunctionsInClass);
        let hidden = false;
        for (const word of filter) {
            if (classItem.id.split("#")[0].includes(word)) {
                hidden = true;
                break
            }
        }
        if (hidden) {
            continue;
        }
        nodes.push({
            id: classItem.id,
            position: {
                x: x,
                y: 0
            },
            data: {
                label: classItem.id,
                type: "class"
            },
            style: {
                backgroundColor: classColor,
                border: '0.5px solid #e0e0e0',
                ...boxStyle,
                paddingBottom: "1rem"
            },
            type: 'groupNode',
            zIndex: 0,
            hidden: hidden,
        })

        let functionX = 30;
        let functionY = 60;
        let k = 0;
        for (const key in functions) {
            const functionItem = functions[key];
            const functionId = functionItem.id;
            // @ts-ignore
            if (showUnConnectedNodes && callTree.functions[functionId].numberOfCalls == 0) {
                continue;
            }

            nodes.push({
                id: functionId,
                data: {
                    label: key,
                    type: "function"
                },
                position: {
                    x: functionX,
                    y: functionY
                },
                parentNode: classItem.id,
                connectable: false,
                extent: "parent",
                style: {
                    backgroundColor: functionColor,
                    ...boxStyle,
                },
                type: 'resizableNode',
                zIndex: 2,
                hidden: hidden,
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
        x += 400 + margin;
    }
    return nodes;
}
export function generateEdges(callTree: CallTree): Edge[] {
    const functions = callTree.functions;
    enum edgeType {
        floating = "floating",
        bezier = "bezier"
    }
    interface CustomEdge {
        id: string, // sorce + - + target
        source: string,
        target: string,
        sourceHandle: string,
        targetHandle: string,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        type: edgeType,
        animated: boolean,
        style: {
            strokeWidth: 2,
        },
        zIndex: 1,
    }
    const edges: CustomEdge[] = [];

    for (const key in functions) {
        const functionItem = functions[key];
        const functionId = `${functionItem.name}`;
        if (functionItem) {
            const children = functionItem.children;
            for (const key3 of children) {
                const child = functions[key3];
                if (!child) continue;
                const childId = `${child.name}`;
                const edgeId = `${functionId}-${childId}`;
                edges.push({
                    id: edgeId,
                    source: functionId,
                    target: childId,
                    sourceHandle: "b",
                    targetHandle: "b",
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                    animated: false,
                    type: edgeType.floating,
                    style: {
                        strokeWidth: 2,
                    },
                    zIndex: 1,
                })
            }
        }
    }
    return edges;
}
