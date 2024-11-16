// // Store nodes and edges
// let nodes = [];
// let edges = [];
// let nodeCounter = 0;
// let selectedNode = null;
// const terminal = document.querySelector('.terminal');

// // Event listeners for buttons
// document.querySelector(".AddEdge").addEventListener("click", addNode);
// document.querySelector(".AddLink").addEventListener("click", addEdge);
// document.querySelector(".deleteEdge").addEventListener("click", deleteNode);
// document.querySelector(".runDijs").addEventListener("click", runDijkstra);
// document.querySelector(".finddeeg").addEventListener("click", findDegree);
// document.querySelector(".clear").addEventListener("click", clearScreen);

// // Function to add a node
// function addNode() {
//     const nodeName = prompt("Enter the name of the node:");
//     if (!nodeName) {
//         alert("Node name cannot be empty.");
//         return;
//     }

//     const screen = document.querySelector(".screen");
//     const screenRect = screen.getBoundingClientRect();

//     const nodeElement = document.createElement("div");
//     nodeElement.classList.add("node");
//     nodeElement.textContent = nodeName;

//     const x = Math.random() * (screenRect.width - 30);
//     const y = Math.random() * (screenRect.height - 30);
//     nodeElement.style.left = `${x}px`;
//     nodeElement.style.top = `${y}px`;

//     nodeElement.addEventListener("click", () => {
//         if (selectedNode) {
//             selectedNode.style.borderColor = "#007bff"; // Reset previous selected node
//         }
//         selectedNode = nodeElement;
//         nodeElement.style.borderColor = "red"; // Highlight selected node
//     });

//     screen.appendChild(nodeElement);
//     nodes.push({ id: nodeCounter, element: nodeElement, name: nodeName });
//     nodeCounter++;
// }

// // Function to add an edge
// function addEdge() {
//     if (nodes.length < 2) {
//         alert("You need at least two nodes to create an edge.");
//         return;
//     }
//     if (!selectedNode) {
//         alert("Select a node first.");
//         return;
//     }

//     const startNode = selectedNode;
//     const endNodeName = prompt("Enter the name of the node to connect to:");
//     const targetNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (targetNode) {
//         const weight = prompt("Enter the weight of the edge:");
//         createLine(startNode, targetNode.element, weight);
//         edges.push({ start: startNode, end: targetNode.element, weight: parseFloat(weight) });
//         printToTerminal(`Edge created between ${startNode.textContent} and ${targetNode.element.textContent} with weight ${weight}`, 'green');
//     } else {
//         alert("Invalid node selected!");
//     }
// }

// // Function to create a line between two nodes
// function createLine(startElement, endElement, weight) {
//     const screen = document.querySelector(".screen");
//     const startRect = startElement.getBoundingClientRect();
//     const endRect = endElement.getBoundingClientRect();
//     const screenRect = screen.getBoundingClientRect();

//     const x1 = startRect.left + startRect.width / 2 - screenRect.left;
//     const y1 = startRect.top + startRect.height / 2 - screenRect.top;
//     const x2 = endRect.left + endRect.width / 2 - screenRect.left;
//     const y2 = endRect.top + endRect.height / 2 - screenRect.top;

//     const line = document.createElement("div");
//     line.classList.add("edge");
//     line.style.position = "absolute";
//     line.style.width = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`;
//     line.style.border = "1px solid black";
//     line.style.transformOrigin = "0 0";
//     line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
//     line.style.left = `${x1}px`;
//     line.style.top = `${y1}px`;
    
//     // Add weight text to the line
//     const weightElement = document.createElement("span");
//     weightElement.textContent = weight;
//     weightElement.style.position = "absolute";
//     weightElement.style.left = `${(x1 + x2) / 2}px`;
//     weightElement.style.top = `${(y1 + y2) / 2}px`;
//     weightElement.style.backgroundColor = "white"; // Background for readability
//     weightElement.style.padding = "2px";
//     weightElement.style.fontSize = "14px";
    
//     screen.appendChild(line);
//     screen.appendChild(weightElement);
// }

// // Function to delete a selected node
// function deleteNode() {
//     if (!selectedNode) {
//         alert("Select a node to delete.");
//         return;
//     }

//     const nodeIndex = nodes.findIndex(node => node.element === selectedNode);
//     if (nodeIndex !== -1) {
//         nodes[nodeIndex].element.remove();
//         nodes.splice(nodeIndex, 1);

//         // Remove connected edges
//         edges = edges.filter(edge => {
//             if (edge.start === selectedNode || edge.end === selectedNode) {
//                 edge.line.remove(); // Remove line from the screen
//                 return false; // Remove edge from the edges array
//             }
//             return true;
//         });

//         selectedNode = null;
//         printToTerminal(`Node deleted along with all connected edges.`, 'red');
//     }
// }

// // Function to run Dijkstra's algorithm
// function runDijkstra() {
//     const startNodeName = prompt("Enter the name of the starting node:");
//     const endNodeName = prompt("Enter the name of the ending node:");

//     const startNode = nodes.find(node => node.element.textContent === startNodeName);
//     const endNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (!startNode || !endNode) {
//         alert("Both nodes must exist.");
//         return;
//     }

//     // Dijkstra's algorithm implementation
//     const distances = {};
//     const previousNodes = {};
//     const queue = [];

//     nodes.forEach(node => {
//         distances[node.name] = Infinity;
//         previousNodes[node.name] = null;
//         queue.push(node.name);
//     });

//     distances[startNodeName] = 0;

//     while (queue.length > 0) {
//         // Sort queue to find the node with the smallest distance
//         queue.sort((a, b) => distances[a] - distances[b]);
//         const currentNodeName = queue.shift(); // Get the node with the smallest distance

//         if (currentNodeName === endNodeName) {
//             break; // Exit if we've reached the end node
//         }

//         const currentNodeEdges = edges.filter(edge => edge.start.textContent === currentNodeName);
        
//         currentNodeEdges.forEach(edge => {
//             const neighborName = edge.end.textContent;
//             const newDistance = distances[currentNodeName] + edge.weight;

//             if (newDistance < distances[neighborName]) {
//                 distances[neighborName] = newDistance;
//                 previousNodes[neighborName] = currentNodeName;
//             }
//         });
//     }

//     // Build the shortest path
//     const path = [];
//     let currentNodeName = endNodeName;
//     while (currentNodeName) {
//         path.unshift(currentNodeName);
//         currentNodeName = previousNodes[currentNodeName];
//     }

//     if (path[0] === startNodeName) {
//         printToTerminal(`Shortest path from ${startNodeName} to ${endNodeName}: ${path.join(" -> ")} with total weight ${distances[endNodeName]}`, 'blue');
//     } else {
//         printToTerminal(`No path found from ${startNodeName} to ${endNodeName}`, 'red');
//     }
// }

// // Function to find the degree of a node
// function findDegree() {
//     const nodeName = prompt("Enter the name of the node to find its degree:");
//     const node = nodes.find(n => n.element.textContent === nodeName);

//     if (!node) {
//         alert("Node not found.");
//         return;
//     }

//     const degree = edges.reduce((count, edge) => {
//         return (edge.start.textContent === nodeName || edge.end.textContent === nodeName) ? count + 1 : count;
//     }, 0);

//     printToTerminal(`Degree of ${nodeName}: ${degree}`, 'orange');
// }

// // Function to print messages to the terminal
// function printToTerminal(message, color) {
//     const messageElement = document.createElement('div');
//     messageElement.textContent = message;
//     messageElement.style.color = color;

//     // Clear terminal if it gets too long
//     if (terminal.children.length >= 10) {
//         terminal.innerHTML = ''; // Clear terminal
//     }

//     terminal.appendChild(messageElement);
// }

// // Function to clear the screen and terminal
// function clearScreen() {
//     const screen = document.querySelector(".screen");
//     screen.innerHTML = '';
//     nodes = [];
//     edges = [];
//     nodeCounter = 0;
//     selectedNode = null;
//     terminal.innerHTML = ''; // Clear terminal
// }


// Store nodes and edges


// Store nodes and edges
// Store nodes and edges


// let nodes = [];
// let edges = [];
// let nodeCounter = 0;
// let selectedNode = null;
// let selectedEdge = null; // To store the selected edge
// const terminal = document.querySelector('.terminal');

// // Event listeners for buttons
// document.querySelector(".AddEdge").addEventListener("click", addNode);
// document.querySelector(".AddLink").addEventListener("click", addEdge);
// document.querySelector(".deleteEdge").addEventListener("click", deleteNode);
// document.querySelector(".runDijs").addEventListener("click", runDijkstra);
// document.querySelector(".finddeeg").addEventListener("click", findDegree);
// document.querySelector(".clear").addEventListener("click", clearScreen);

// // Function to add a node
// function addNode() {
//     const nodeName = prompt("Enter the name of the node:");
//     if (!nodeName) {
//         alert("Node name cannot be empty.");
//         return;
//     }

//     const screen = document.querySelector(".screen");
//     const screenRect = screen.getBoundingClientRect();

//     const nodeElement = document.createElement("div");
//     nodeElement.classList.add("node");
//     nodeElement.textContent = nodeName;

//     const x = Math.random() * (screenRect.width - 30);
//     const y = Math.random() * (screenRect.height - 30);
//     nodeElement.style.left = `${x}px`;
//     nodeElement.style.top = `${y}px`;

//     nodeElement.addEventListener("click", () => {
//         if (selectedNode) {
//             selectedNode.style.borderColor = "#007bff"; // Reset previous selected node
//         }
//         selectedNode = nodeElement;
//         nodeElement.style.borderColor = "red"; // Highlight selected node
//     });

//     screen.appendChild(nodeElement);
//     nodes.push({ id: nodeCounter, element: nodeElement, name: nodeName });
//     nodeCounter++;
// }

// // Function to add an edge
// function addEdge() {
//     if (nodes.length < 2) {
//         alert("You need at least two nodes to create an edge.");
//         return;
//     }
//     if (!selectedNode) {
//         alert("Select a node first.");
//         return;
//     }

//     const startNode = selectedNode;
//     const endNodeName = prompt("Enter the name of the node to connect to:");
//     const targetNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (targetNode) {
//         const weight = prompt("Enter the weight of the edge:");
//         createLine(startNode, targetNode.element, weight);
//         edges.push({ start: startNode, end: targetNode.element, weight: parseFloat(weight) });
//         printToTerminal(`Edge created between ${startNode.textContent} and ${targetNode.element.textContent} with weight ${weight}`, 'green');
//     } else {
//         alert("Invalid node selected!");
//     }
// }

// // Function to create a line between two nodes
// function createLine(startElement, endElement, weight) {
//     const screen = document.querySelector(".screen");
//     const startRect = startElement.getBoundingClientRect();
//     const endRect = endElement.getBoundingClientRect();
//     const screenRect = screen.getBoundingClientRect();

//     const x1 = startRect.left + startRect.width / 2 - screenRect.left;
//     const y1 = startRect.top + startRect.height / 2 - screenRect.top;
//     const x2 = endRect.left + endRect.width / 2 - screenRect.left;
//     const y2 = endRect.top + endRect.height / 2 - screenRect.top;

//     const line = document.createElement("div");
//     line.classList.add("edge");
//     line.style.position = "absolute";
//     line.style.width = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`;
//     line.style.border = "1px solid black";
//     line.style.transformOrigin = "0 0";
//     line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
//     line.style.left = `${x1}px`;
//     line.style.top = `${y1}px`;
    
//     // Add weight text to the line
//     const weightElement = document.createElement("span");
//     weightElement.textContent = weight;
//     weightElement.style.position = "absolute";
//     weightElement.style.left = `${(x1 + x2) / 2}px`;
//     weightElement.style.top = `${(y1 + y2) / 2}px`;
//     weightElement.style.backgroundColor = "white"; // Background for readability
//     weightElement.style.padding = "2px";
//     weightElement.style.fontSize = "14px";
    
//     screen.appendChild(line);
//     screen.appendChild(weightElement);
// }

// // Function to delete a selected node and all connected edges
// function deleteNode() {
//     if (!selectedNode) {
//         alert("Select a node to delete.");
//         return;
//     }

//     const nodeIndex = nodes.findIndex(node => node.element === selectedNode);
//     if (nodeIndex !== -1) {
//         // Remove edges connected to the selected node
//         edges = edges.filter(edge => {
//             if (edge.start === selectedNode || edge.end === selectedNode) {
//                 edge.line.remove(); // Remove line from the screen
//                 return false; // Remove edge from the edges array
//             }
//             return true;
//         });

//         nodes[nodeIndex].element.remove(); // Remove the selected node
//         nodes.splice(nodeIndex, 1); // Remove from nodes array
//         selectedNode = null; // Reset selected node
//         printToTerminal(`Node deleted along with all connected edges.`, 'red');
//     }
// }

// // Function to run Dijkstra's algorithm
// function runDijkstra() {
//     const startNodeName = prompt("Enter the name of the starting node:");
//     const endNodeName = prompt("Enter the name of the ending node:");

//     const startNode = nodes.find(node => node.element.textContent === startNodeName);
//     const endNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (!startNode || !endNode) {
//         alert("Both nodes must exist.");
//         return;
//     }

//     // Dijkstra's algorithm implementation
//     const distances = {};
//     const previousNodes = {};
//     const queue = [];

//     nodes.forEach(node => {
//         distances[node.name] = Infinity; // Initialize distances
//         previousNodes[node.name] = null; // Initialize previous nodes
//         queue.push(node.name); // Add nodes to queue
//     });

//     distances[startNodeName] = 0; // Distance to the start node is 0

//     while (queue.length > 0) {
//         // Sort queue to find the node with the smallest distance
//         queue.sort((a, b) => distances[a] - distances[b]);
//         const currentNodeName = queue.shift(); // Get the node with the smallest distance

//         if (currentNodeName === endNodeName) {
//             break; // Exit if we've reached the end node
//         }

//         // Get edges connected to the current node
//         const currentNodeEdges = edges.filter(edge => edge.start.textContent === currentNodeName);

//         currentNodeEdges.forEach(edge => {
//             const neighborName = edge.end.textContent; // Get the neighbor's name
//             const newDistance = distances[currentNodeName] + edge.weight; // Calculate new distance

//             if (newDistance < distances[neighborName]) {
//                 distances[neighborName] = newDistance; // Update distance
//                 previousNodes[neighborName] = currentNodeName; // Update previous node
//             }
//         });
//     }

//     // Build the shortest path
//     const path = [];
//     let currentNodeName = endNodeName;
//     while (currentNodeName) {
//         path.unshift(currentNodeName); // Add to path
//         currentNodeName = previousNodes[currentNodeName]; // Move to previous node
//     }

//     if (path[0] === startNodeName) {
//         printToTerminal(`Shortest path from ${startNodeName} to ${endNodeName}: ${path.join(" -> ")} with total weight ${distances[endNodeName]}`, 'blue');
//     } else {
//         printToTerminal(`No path found from ${startNodeName} to ${endNodeName}`, 'red');
//     }
// }

// // Function to find the degree of a node
// function findDegree() {
//     const nodeName = prompt("Enter the name of the node to find its degree:");
//     const node = nodes.find(n => n.element.textContent === nodeName);

//     if (!node) {
//         alert("Node not found.");
//         return;
//     }

//     const degree = edges.reduce((count, edge) => {
//         return (edge.start.textContent === nodeName || edge.end.textContent === nodeName) ? count + 1 : count;
//     }, 0);

//     printToTerminal(`Degree of ${nodeName}: ${degree}`, 'orange');
// }

// // Function to print messages to the terminal
// function printToTerminal(message, color) {
//     terminal.innerHTML = ''; // Clear terminal before printing new output
//     const messageElement = document.createElement('div');
//     messageElement.textContent = message;
//     messageElement.style.color = color; // Set text color based on message type
//     terminal.appendChild(messageElement);
// }

// // Function to clear the screen
// function clearScreen() {
//     const screen = document.querySelector(".screen");
//     screen.innerHTML = ''; // Clear all nodes and edges
//     nodes = []; // Reset nodes array
//     edges = []; // Reset edges array
//     selectedNode = null; // Reset selected node
//     selectedEdge = null; // Reset selected edge
//     terminal.innerHTML = ''; // Clear terminal
// }






// let nodes = [];
// let edges = [];
// let nodeCounter = 0;
// let selectedNode = null;
// const terminal = document.querySelector('.terminal');

// // Event listeners for buttons
// document.querySelector(".AddEdge").addEventListener("click", addNode);
// document.querySelector(".AddLink").addEventListener("click", addEdge);
// document.querySelector(".deleteEdge").addEventListener("click", deleteNode);
// document.querySelector(".runDijs").addEventListener("click", runDijkstra);
// document.querySelector(".finddeeg").addEventListener("click", findDegree);
// document.querySelector(".clear").addEventListener("click", clearScreen);

// // Function to add a node
// function addNode() {
//     const nodeName = prompt("Enter the name of the node:");
//     if (!nodeName) {
//         alert("Node name cannot be empty.");
//         return;
//     }

//     const screen = document.querySelector(".screen");
//     const screenRect = screen.getBoundingClientRect();

//     const nodeElement = document.createElement("div");
//     nodeElement.classList.add("node");
//     nodeElement.textContent = nodeName;

//     const x = Math.random() * (screenRect.width - 30);
//     const y = Math.random() * (screenRect.height - 30);
//     nodeElement.style.left = `${x}px`;
//     nodeElement.style.top = `${y}px`;

//     nodeElement.addEventListener("click", () => {
//         if (selectedNode) {
//             selectedNode.style.borderColor = "#007bff"; // Reset previous selected node
//         }
//         selectedNode = nodeElement;
//         nodeElement.style.borderColor = "red"; // Highlight selected node
//     });

//     screen.appendChild(nodeElement);
//     nodes.push({ id: nodeCounter, element: nodeElement, name: nodeName });
//     nodeCounter++;
// }

// // Function to add an edge
// function addEdge() {
//     if (nodes.length < 2) {
//         alert("You need at least two nodes to create an edge.");
//         return;
//     }
//     if (!selectedNode) {
//         alert("Select a node first.");
//         return;
//     }

//     const startNode = selectedNode;
//     const endNodeName = prompt("Enter the name of the node to connect to:");
//     const targetNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (targetNode) {
//         const weight = prompt("Enter the weight of the edge:");
//         createLine(startNode, targetNode.element, weight);
//         edges.push({ start: startNode, end: targetNode.element, weight: parseFloat(weight) });
//         printToTerminal(`Edge created between ${startNode.textContent} and ${targetNode.element.textContent} with weight ${weight}`, 'green');
//     } else {
//         alert("Invalid node selected!");
//     }
// }

// // Function to create a line between two nodes
// function createLine(startElement, endElement, weight) {
//     const screen = document.querySelector(".screen");
//     const startRect = startElement.getBoundingClientRect();
//     const endRect = endElement.getBoundingClientRect();
//     const screenRect = screen.getBoundingClientRect();

//     const x1 = startRect.left + startRect.width / 2 - screenRect.left;
//     const y1 = startRect.top + startRect.height / 2 - screenRect.top;
//     const x2 = endRect.left + endRect.width / 2 - screenRect.left;
//     const y2 = endRect.top + endRect.height / 2 - screenRect.top;

//     const line = document.createElement("div");
//     line.classList.add("edge");
//     line.style.position = "absolute";
//     line.style.width = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`;
//     line.style.border = "1px solid black";
//     line.style.transformOrigin = "0 0";
//     line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
//     line.style.left = `${x1}px`;
//     line.style.top = `${y1}px`;
    
//     // Add weight text to the line
//     const weightElement = document.createElement("span");
//     weightElement.textContent = weight;
//     weightElement.style.position = "absolute";
//     weightElement.style.left = `${(x1 + x2) / 2}px`;
//     weightElement.style.top = `${(y1 + y2) / 2}px`;
//     weightElement.style.backgroundColor = "white"; // Background for readability
//     weightElement.style.padding = "2px";
//     weightElement.style.fontSize = "14px";
    
//     screen.appendChild(line);
//     screen.appendChild(weightElement);
// }

// // Function to delete a selected node and all connected edges
// function deleteNode() {
//     if (!selectedNode) {
//         alert("Select a node to delete.");
//         return;
//     }

//     const nodeIndex = nodes.findIndex(node => node.element === selectedNode);
//     if (nodeIndex !== -1) {
//         // Remove edges connected to the selected node
//         edges = edges.filter(edge => {
//             if (edge.start === selectedNode || edge.end === selectedNode) {
//                 edge.line.remove(); // Remove line from the screen
//                 return false; // Remove edge from the edges array
//             }
//             return true;
//         });

//         selectedNode.remove(); // Remove the selected node
//         nodes.splice(nodeIndex, 1); // Remove from nodes array
//         selectedNode = null; // Reset selected node
//         printToTerminal(`Node deleted along with all connected edges.`, 'red');
//     }
// }

// // Function to run Dijkstra's algorithm
// function runDijkstra() {
//     const startNodeName = prompt("Enter the name of the starting node:");
//     const endNodeName = prompt("Enter the name of the ending node:");

//     const startNode = nodes.find(node => node.element.textContent === startNodeName);
//     const endNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (!startNode || !endNode) {
//         alert("Both nodes must exist.");
//         return;
//     }

//     // Dijkstra's algorithm implementation
//     const distances = {};
//     const previousNodes = {};
//     const queue = [];

//     nodes.forEach(node => {
//         distances[node.name] = Infinity; // Initialize distances
//         previousNodes[node.name] = null; // Initialize previous nodes
//         queue.push(node.name); // Add nodes to queue
//     });

//     distances[startNodeName] = 0; // Distance to the start node is 0

//     while (queue.length > 0) {
//         // Sort queue to find the node with the smallest distance
//         queue.sort((a, b) => distances[a] - distances[b]);
//         const currentNodeName = queue.shift(); // Get the node with the smallest distance

//         if (currentNodeName === endNodeName) {
//             break; // Exit if we've reached the end node
//         }

//         // Get edges connected to the current node
//         const currentNodeEdges = edges.filter(edge => edge.start.textContent === currentNodeName);

//         currentNodeEdges.forEach(edge => {
//             const neighborName = edge.end.textContent; // Get the neighbor's name
//             const newDistance = distances[currentNodeName] + edge.weight; // Calculate new distance

//             if (newDistance < distances[neighborName]) {
//                 distances[neighborName] = newDistance; // Update distance
//                 previousNodes[neighborName] = currentNodeName; // Update previous node
//             }
//         });
//     }

//     // Build the shortest path
//     const path = [];
//     let currentNodeName = endNodeName;
//     while (currentNodeName) {
//         path.unshift(currentNodeName); // Add to path
//         currentNodeName = previousNodes[currentNodeName]; // Move to previous node
//     }

//     if (path[0] === startNodeName) {
//         printToTerminal(`Shortest path from ${startNodeName} to ${endNodeName}: ${path.join(" -> ")} with total weight ${distances[endNodeName]}`, 'blue');
//     } else {
//         printToTerminal(`No path found from ${startNodeName} to ${endNodeName}`, 'red');
//     }
// }

// // Function to find the degree of a node
// function findDegree() {
//     const nodeName = prompt("Enter the name of the node to find its degree:");
//     const node = nodes.find(n => n.element.textContent === nodeName);

//     if (!node) {
//         alert("Node not found.");
//         return;
//     }

//     const degree = edges.reduce((count, edge) => {
//         return (edge.start.textContent === nodeName || edge.end.textContent === nodeName) ? count + 1 : count;
//     }, 0);

//     printToTerminal(`Degree of ${nodeName}: ${degree}`, 'orange');
// }

// // Function to print messages to the terminal
// function printToTerminal(message, color) {
//     terminal.innerHTML = ''; // Clear terminal before printing new output
//     const messageElement = document.createElement('div');
//     messageElement.textContent = message;
//     messageElement.style.color = color; // Set text color based on message type
//     terminal.appendChild(messageElement);
// }

// // Function to clear the screen
// function clearScreen() {
//     const screen = document.querySelector(".screen");
//     screen.innerHTML = ''; // Clear all nodes and edges
//     nodes = []; // Reset nodes array
//     edges = []; // Reset edges array
//     selectedNode = null; // Reset selected node
//     terminal.innerHTML = ''; // Clear terminal
// }


// let nodes = [];
// let edges = [];
// let nodeCounter = 0;
// let selectedNode = null;
// const terminal = document.querySelector('.terminal');

// // Event listeners for buttons
// document.querySelector(".AddEdge").addEventListener("click", addNode);
// document.querySelector(".AddLink").addEventListener("click", addEdge);
// document.querySelector(".deleteEdge").addEventListener("click", deleteNode);
// document.querySelector(".runDijs").addEventListener("click", runDijkstra);
// document.querySelector(".finddeeg").addEventListener("click", findDegree);
// document.querySelector(".clear").addEventListener("click", clearScreen);

// // Function to add a node
// function addNode() {
//     const nodeName = prompt("Enter the name of the node:");
//     if (!nodeName) {
//         alert("Node name cannot be empty.");
//         return;
//     }

//     const screen = document.querySelector(".screen");
//     const screenRect = screen.getBoundingClientRect();

//     const nodeElement = document.createElement("div");
//     nodeElement.classList.add("node");
//     nodeElement.textContent = nodeName;

//     const x = Math.random() * (screenRect.width - 30);
//     const y = Math.random() * (screenRect.height - 30);
//     nodeElement.style.left = `${x}px`;
//     nodeElement.style.top = `${y}px`;

//     nodeElement.addEventListener("click", (event) => {
//         event.stopPropagation(); // Prevent click event from bubbling up
//         if (selectedNode) {
//             selectedNode.style.borderColor = "#007bff"; // Reset previous selected node
//         }
//         selectedNode = nodeElement;
//         nodeElement.style.borderColor = "red"; // Highlight selected node
//     });

//     screen.appendChild(nodeElement);
//     nodes.push({ id: nodeCounter, element: nodeElement, name: nodeName });
//     nodeCounter++;
// }

// // Function to add an edge
// function addEdge() {
//     if (nodes.length < 2) {
//         alert("You need at least two nodes to create an edge.");
//         return;
//     }
//     if (!selectedNode) {
//         alert("Select a node first.");
//         return;
//     }

//     const startNode = selectedNode;
//     const endNodeName = prompt("Enter the name of the node to connect to:");
//     const targetNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (targetNode) {
//         const weight = prompt("Enter the weight of the edge:");
//         createLine(startNode, targetNode.element, weight);
//         edges.push({ start: startNode, end: targetNode.element, weight: parseFloat(weight) });
//         printToTerminal(`Edge created between ${startNode.textContent} and ${targetNode.element.textContent} with weight ${weight}`, 'green');
//     } else {
//         alert("Invalid node selected!");
//     }
// }

// // Function to create a line between two nodes
// function createLine(startElement, endElement, weight) {
//     const screen = document.querySelector(".screen");
//     const startRect = startElement.getBoundingClientRect();
//     const endRect = endElement.getBoundingClientRect();
//     const screenRect = screen.getBoundingClientRect();

//     const x1 = startRect.left + startRect.width / 2 - screenRect.left;
//     const y1 = startRect.top + startRect.height / 2 - screenRect.top;
//     const x2 = endRect.left + endRect.width / 2 - screenRect.left;
//     const y2 = endRect.top + endRect.height / 2 - screenRect.top;

//     const line = document.createElement("div");
//     line.classList.add("edge");
//     line.style.position = "absolute";
//     line.style.width = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`;
//     line.style.border = "1px solid black";
//     line.style.transformOrigin = "0 0";
//     line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
//     line.style.left = `${x1}px`;
//     line.style.top = `${y1}px`;
    
//     // Add weight text to the line
//     const weightElement = document.createElement("span");
//     weightElement.textContent = weight;
//     weightElement.style.position = "absolute";
//     weightElement.style.left = `${(x1 + x2) / 2}px`;
//     weightElement.style.top = `${(y1 + y2) / 2}px`;
//     weightElement.style.backgroundColor = "white"; // Background for readability
//     weightElement.style.padding = "2px";
//     weightElement.style.fontSize = "14px";
    
//     screen.appendChild(line);
//     screen.appendChild(weightElement);
// }

// // Function to delete a selected node and all connected edges
// function deleteNode() {
//     if (!selectedNode) {
//         alert("Select a node to delete.");
//         return;
//     }

//     const nodeIndex = nodes.findIndex(node => node.element === selectedNode);
//     if (nodeIndex !== -1) {
//         // Remove edges connected to the selected node
//         edges = edges.filter(edge => {
//             if (edge.start === selectedNode || edge.end === selectedNode) {
//                 edge.line.remove(); // Remove line from the screen
//                 return false; // Remove edge from the edges array
//             }
//             return true;
//         });

//         selectedNode.remove(); // Remove the selected node
//         nodes.splice(nodeIndex, 1); // Remove from nodes array
//         selectedNode = null; // Reset selected node
//         printToTerminal(`Node deleted along with all connected edges.`, 'red');
//     }
// }

// // Function to run Dijkstra's algorithm
// // Function to run Dijkstra's algorithm
// function runDijkstra() {
//     const startNodeName = prompt("Enter the name of the starting node:");
//     const endNodeName = prompt("Enter the name of the ending node:");

//     const startNode = nodes.find(node => node.element.textContent === startNodeName);
//     const endNode = nodes.find(node => node.element.textContent === endNodeName);

//     if (!startNode || !endNode) {
//         alert("Both nodes must exist.");
//         return;
//     }

//     // Dijkstra's algorithm implementation
//     const distances = {};
//     const previousNodes = {};
//     const queue = [];

//     nodes.forEach(node => {
//         distances[node.name] = Infinity; // Initialize distances
//         previousNodes[node.name] = null; // Initialize previous nodes
//         queue.push(node.name); // Add nodes to queue
//     });

//     distances[startNodeName] = 0; // Distance to the start node is 0

//     while (queue.length > 0) {
//         // Sort queue to find the node with the smallest distance
//         queue.sort((a, b) => distances[a] - distances[b]);
//         const currentNodeName = queue.shift(); // Get the node with the smallest distance

//         // If we reach the end node, we can stop
//         if (currentNodeName === endNodeName) {
//             break;
//         }

//         // Get edges connected to the current node
//         const currentNodeEdges = edges.filter(edge => edge.start.textContent === currentNodeName);

//         currentNodeEdges.forEach(edge => {
//             const neighborName = edge.end.textContent; // Get the neighbor's name
//             const newDistance = distances[currentNodeName] + edge.weight; // Calculate new distance

//             if (newDistance < distances[neighborName]) {
//                 distances[neighborName] = newDistance; // Update distance
//                 previousNodes[neighborName] = currentNodeName; // Update previous node
//             }
//         });
//     }

//     // Build the shortest path
//     const path = [];
//     let currentNodeName = endNodeName;
//     while (currentNodeName) {
//         path.unshift(currentNodeName); // Add to path
//         currentNodeName = previousNodes[currentNodeName]; // Move to previous node
//     }

//     if (path[0] === startNodeName) {
//         printToTerminal(`Shortest path from ${startNodeName} to ${endNodeName}: ${path.join(" -> ")} with total weight ${distances[endNodeName]}`, 'blue');
//     } else {
//         printToTerminal(`No path found from ${startNodeName} to ${endNodeName}`, 'red');
//     }
// }


// // Function to find the degree of a node
// function findDegree() {
//     const nodeName = prompt("Enter the name of the node to find its degree:");
//     const node = nodes.find(n => n.element.textContent === nodeName);

//     if (!node) {
//         alert("Node not found.");
//         return;
//     }

//     const degree = edges.reduce((count, edge) => {
//         return (edge.start.textContent === nodeName || edge.end.textContent === nodeName) ? count + 1 : count;
//     }, 0);

//     printToTerminal(`Degree of ${nodeName}: ${degree}`, 'orange');
// }

// // Function to print messages to the terminal
// function printToTerminal(message, color) {
//     terminal.innerHTML = ''; // Clear terminal before printing new output
//     const messageElement = document.createElement('div');
//     messageElement.textContent = message;
//     messageElement.style.color = color; // Set text color based on message type
//     terminal.appendChild(messageElement);
// }

// // Function to clear the screen
// function clearScreen() {
//     const screen = document.querySelector(".screen");
//     screen.innerHTML = ''; // Clear all nodes and edges
//     nodes = []; // Reset nodes array
//     edges = []; // Reset edges array
//     selectedNode = null; // Reset selected node
//     terminal.innerHTML = ''; // Clear terminal
// }









let nodes = [];
let edges = [];
let nodeCounter = 0;
let selectedNode = null;
const terminal = document.querySelector('.terminal');

// Event listeners for buttons
document.querySelector(".AddEdge").addEventListener("click", addNode);
document.querySelector(".AddLink").addEventListener("click", addEdge);
document.querySelector(".deleteEdge").addEventListener("click", deleteNode);
document.querySelector(".runDijs").addEventListener("click", runDijkstra);
document.querySelector(".finddeeg").addEventListener("click", findDegree);
document.querySelector(".clear").addEventListener("click", clearScreen);

// Function to add a node
function addNode() {
    const nodeName = prompt("Enter the name of the node:");
    if (!nodeName) {
        alert("Node name cannot be empty.");
        return;
    }

    const screen = document.querySelector(".screen");
    const screenRect = screen.getBoundingClientRect();

    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.textContent = nodeName;

    const x = Math.random() * (screenRect.width - 30);
    const y = Math.random() * (screenRect.height - 30);
    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;

    nodeElement.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        if (selectedNode) {
            selectedNode.style.borderColor = "#007bff"; // Reset previous selected node
        }
        selectedNode = nodeElement;
        nodeElement.style.borderColor = "red"; // Highlight selected node
    });

    screen.appendChild(nodeElement);
    nodes.push({ id: nodeCounter, element: nodeElement, name: nodeName });
    nodeCounter++;
}

// Function to add an edge
function addEdge() {
    if (nodes.length < 2) {
        alert("You need at least two nodes to create an edge.");
        return;
    }
    if (!selectedNode) {
        alert("Select a node first.");
        return;
    }

    const startNode = selectedNode;
    const endNodeName = prompt("Enter the name of the node to connect to:");
    const targetNode = nodes.find(node => node.element.textContent === endNodeName);

    if (targetNode) {
        const weight = prompt("Enter the weight of the edge:");
        createLine(startNode, targetNode.element, weight);
        edges.push({ start: startNode, end: targetNode.element, weight: parseFloat(weight) });
        printToTerminal(`Edge created between ${startNode.textContent} and ${targetNode.element.textContent} with weight ${weight}`, 'green');
    } else {
        alert("Invalid node selected!");
    }
}

// Function to create a line between two nodes
function createLine(startElement, endElement, weight) {
    const screen = document.querySelector(".screen");
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const screenRect = screen.getBoundingClientRect();

    const x1 = startRect.left + startRect.width / 2 - screenRect.left;
    const y1 = startRect.top + startRect.height / 2 - screenRect.top;
    const x2 = endRect.left + endRect.width / 2 - screenRect.left;
    const y2 = endRect.top + endRect.height / 2 - screenRect.top;

    const line = document.createElement("div");
    line.classList.add("edge");
    line.style.position = "absolute";
    line.style.width = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`;
    line.style.border = "1px solid black";
    line.style.transformOrigin = "0 0";
    line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    
    // Add weight text to the line
    const weightElement = document.createElement("span");
    weightElement.textContent = weight;
    weightElement.style.position = "absolute";
    weightElement.style.left = `${(x1 + x2) / 2}px`;
    weightElement.style.top = `${(y1 + y2) / 2}px`;
    weightElement.style.backgroundColor = "white"; // Background for readability
    weightElement.style.padding = "2px";
    weightElement.style.fontSize = "14px";
    
    screen.appendChild(line);
    screen.appendChild(weightElement);
}

// Function to delete a selected node and all connected edges
function deleteNode() {
    if (!selectedNode) {
        alert("Select a node to delete.");
        return;
    }

    const nodeIndex = nodes.findIndex(node => node.element === selectedNode);
    if (nodeIndex !== -1) {
        // Remove edges connected to the selected node
        edges = edges.filter(edge => {
            if (edge.start === selectedNode || edge.end === selectedNode) {
                edge.line.remove(); // Remove line from the screen
                return false; // Remove edge from the edges array
            }
            return true;
        });

        selectedNode.remove(); // Remove the selected node
        nodes.splice(nodeIndex, 1); // Remove from nodes array
        selectedNode = null; // Reset selected node
        printToTerminal(`Node deleted along with all connected edges.`, 'red');
    }
}

// Function to run Dijkstra's algorithm
function runDijkstra() {
    const startNodeName = prompt("Enter the name of the starting node:");
    const endNodeName = prompt("Enter the name of the ending node:");

    const startNode = nodes.find(node => node.element.textContent === startNodeName);
    const endNode = nodes.find(node => node.element.textContent === endNodeName);

    if (!startNode || !endNode) {
        alert("Both nodes must exist.");
        return;
    }

    // Dijkstra's algorithm implementation
    const distances = {};
    const previousNodes = {};
    const queue = [];

    nodes.forEach(node => {
        distances[node.name] = Infinity; // Initialize distances
        previousNodes[node.name] = null; // Initialize previous nodes
        queue.push(node.name); // Add nodes to queue
    });

    distances[startNodeName] = 0; // Distance to the start node is 0

    while (queue.length > 0) {
        // Sort queue to find the node with the smallest distance
        queue.sort((a, b) => distances[a] - distances[b]);
        const currentNodeName = queue.shift(); // Get the node with the smallest distance

        // If we reach the end node, we can stop
        if (currentNodeName === endNodeName) {
            break;
        }

        // Get edges connected to the current node
        const currentNodeEdges = edges.filter(edge => edge.start.textContent === currentNodeName);

        currentNodeEdges.forEach(edge => {
            const neighborName = edge.end.textContent; // Get the neighbor's name
            const newDistance = distances[currentNodeName] + edge.weight; // Calculate new distance

            if (newDistance < distances[neighborName]) {
                distances[neighborName] = newDistance; // Update distance
                previousNodes[neighborName] = currentNodeName; // Update previous node
            }
        });
    }

    // Build the shortest path
    const path = [];
    let currentNodeName = endNodeName;
    while (currentNodeName) {
        path.unshift(currentNodeName); // Add to path
        currentNodeName = previousNodes[currentNodeName]; // Move to previous node
    }

    if (path[0] === startNodeName) {
        printToTerminal(`Shortest path from ${startNodeName} to ${endNodeName}: ${path.join(" -> ")} with total weight ${distances[endNodeName]}`, 'blue');
    } else {
        printToTerminal(`No path found from ${startNodeName} to ${endNodeName}`, 'red');
    }
}

// Function to find the degree of a node
function findDegree() {
    const nodeName = prompt("Enter the name of the node to find its degree:");
    const node = nodes.find(n => n.element.textContent === nodeName);

    if (!node) {
        alert("Node not found.");
        return;
    }

    const degree = edges.reduce((count, edge) => {
        return (edge.start.textContent === nodeName || edge.end.textContent === nodeName) ? count + 1 : count;
    }, 0);

    printToTerminal(`Degree of ${nodeName}: ${degree}`, 'orange');
}

// Function to print messages to the terminal
function printToTerminal(message, color) {
    terminal.innerHTML = ''; // Clear terminal before printing new output
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.color = color; // Set text color based on message type
    terminal.appendChild(messageElement);
}

// Function to clear the screen
function clearScreen() {
    const screen = document.querySelector(".screen");
    screen.innerHTML = ''; // Clear all nodes and edges
    nodes = []; // Reset nodes array
    edges = []; // Reset edges array
    selectedNode = null; // Reset selected node
    terminal.innerHTML = ''; // Clear terminal
}
