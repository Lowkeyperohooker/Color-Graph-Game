// Global state variables
const availableColors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan"]; // Extendable for more colors
let colorsNeeded = null;
let selectedColor = null;
let currentProblemIndex = 1; // Start with the first problem
let lastCompletedProblemIndex = null;
let score = 0;

// // Define problems with vertices and adjacency matrices
const problems = {
    1: {
        vertices: [
            { id: 0, x: 50, y: 170 },
            { id: 1, x: 150, y: 120 },
            { id: 2, x: 250, y: 170 }
        ],
        adjacencyMatrix: [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ]
    },
    2: {
        vertices: [
            { id: 0, x: 85, y: 85 },
            { id: 1, x: 185, y: 85 },
            { id: 2, x: 135, y: 185 },
            { id: 3, x: 235, y: 185 }
        ],
        adjacencyMatrix: [
            [0, 1, 1, 0],
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [0, 1, 1, 0]
        ]
    },
    3: {
        vertices: [
            { id: 0, x: 100, y: 100 },
            { id: 1, x: 200, y: 100 },
            { id: 2, x: 100, y: 200 },
            { id: 3, x: 200, y: 200 }
        ],
        adjacencyMatrix: [
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [0, 1, 1, 0]
        ]
    },
    4: {
        vertices: [
            { id: 0, x: 50, y: 100 },
            { id: 1, x: 150, y: 50 },
            { id: 2, x: 250, y: 100 },
            { id: 3, x: 150, y: 150 },
            { id: 4, x: 150, y: 250 }
        ],
        adjacencyMatrix: [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 1, 0],
            [0, 1, 0, 1, 1],
            [1, 1, 1, 0, 1],
            [0, 0, 1, 1, 0]
        ]
    },
    5: {
        vertices: [
            { id: 0, x: 50, y: 50 },
            { id: 1, x: 150, y: 50 },
            { id: 2, x: 250, y: 50 },
            { id: 3, x: 100, y: 150 },
            { id: 4, x: 200, y: 150 },
            { id: 5, x: 150, y: 250 }
        ],
        adjacencyMatrix: [
            [0, 1, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [1, 1, 0, 0, 1, 1],
            [0, 1, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 0]
        ]
    },
    6: {
        vertices: [
            { id: 0, x: 50, y: 100 },
            { id: 1, x: 150, y: 50 },
            { id: 2, x: 250, y: 100 },
            { id: 3, x: 250, y: 200 },
            { id: 4, x: 150, y: 250 },
            { id: 5, x: 50, y: 200 }
        ],
        adjacencyMatrix: [
            [0, 1, 1, 0, 0, 1],
            [1, 0, 1, 0, 0, 0],
            [1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0]
        ]
    },
    7: {
        vertices: [
            { id: 0, x: 100, y: 50 },
            { id: 1, x: 200, y: 50 },
            { id: 2, x: 50, y: 150 },
            { id: 3, x: 150, y: 150 },
            { id: 4, x: 250, y: 150 },
            { id: 5, x: 100, y: 250 },
            { id: 6, x: 200, y: 250 }
        ],
        adjacencyMatrix: [
            [0, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 0],
            [1, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 0, 1, 1, 1],
            [0, 1, 0, 1, 0, 0, 1],
            [0, 0, 1, 1, 0, 0, 1],
            [0, 0, 0, 1, 1, 1, 0]
        ]
    },
    8: {
        vertices: [
            { id: 0, x: 50, y: 95},
            { id: 1, x: 150, y: 50 },
            { id: 2, x: 250, y: 95 },
            { id: 3, x: 250, y: 195 },
            { id: 4, x: 150, y: 250 },
            { id: 5, x: 50, y: 195 },
            { id: 6, x: 150, y: 150 },
            { id: 7, x: 250, y: 250 }
        ],
        adjacencyMatrix: [
            [0, 1, 1, 0, 0, 1, 1, 0],
            [1, 0, 1, 0, 0, 0, 1, 0],
            [1, 1, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 1, 0, 1, 0]
        ]
    }
};


// Initialize the game
function initializeGame() {
    createColorButtons();
    selectProblem(currentProblemIndex);
}

// Select a problem and render the graph
function selectProblem(problemNumber) {
    const problem = problems[problemNumber];
    const svg = document.getElementById("graph");
    svg.innerHTML = ""; // Clear previous graph

    // Draw edges based on adjacency matrix
    problem.adjacencyMatrix.forEach((row, from) => {
        row.forEach((isConnected, to) => {
            if (isConnected) {
                const fromVertex = problem.vertices[from];
                const toVertex = problem.vertices[to];

                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", fromVertex.x);
                line.setAttribute("y1", fromVertex.y);
                line.setAttribute("x2", toVertex.x);
                line.setAttribute("y2", toVertex.y);
                line.setAttribute("stroke", "#e94560");
                svg.appendChild(line);
            }
        });
    });

    // Draw vertices (nodes)
    problem.vertices.forEach(vertex => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", vertex.x);
        circle.setAttribute("cy", vertex.y);
        circle.setAttribute("r", 10);
        circle.classList.add("node");
        circle.dataset.id = vertex.id;
        circle.addEventListener("click", () => colorNode(circle));
        svg.appendChild(circle);
    });


    document.getElementById("message").textContent = ""; // Clear message
}

// Ui for color buttons
function createColorButtons() {
    const colorsContainer = document.getElementById("colors");
    colorsContainer.innerHTML = ""; // Clear any existing buttons

    colorsNeeded = availableColors.slice(0,calculateMinimumColors());

    const capitalizeFirstLetter = (string) =>  string.charAt(0).toUpperCase()+string.slice(1);

    for(const color of colorsNeeded) {
        const button = document.createElement("button");
        button.textContent = capitalizeFirstLetter(color);
        button.style.backgroundColor = color;
        button.style.color = (color === "yellow" || color === "orange") ? "black":"white";
        button.addEventListener('click', () => selectColor(color));
        colorsContainer.appendChild(button);
    }

}

// Solving how many is minimum colors
function calculateMinimumColors() {
    const adjacencyMatrix = problems[currentProblemIndex].adjacencyMatrix;
    const adjMatLength = adjacencyMatrix.length;

    const colors = [];

    for(let index = 0; index < adjMatLength; index++) colors[index] = -1;

    for(let curVertexIndex = 0; curVertexIndex < adjMatLength; curVertexIndex++) {
        const usedColors = new Set();
        
        for(let neighborVertexIndex = 0; neighborVertexIndex < adjMatLength; neighborVertexIndex++) {
            if(adjacencyMatrix[curVertexIndex][neighborVertexIndex] === 1 && colors[neighborVertexIndex] !== -1) {
                usedColors.add(colors[neighborVertexIndex]);
            }
        }

        let color = 0;
        while(usedColors.has(color)) {
            color++;
        }
        colors[curVertexIndex] = color;
    }
    const uniqueColors = new Set(colors);
    return uniqueColors.size;
}


// Select a color
function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll("#colors button").forEach(button => {
        button.style.border = button.textContent.toLowerCase() === color ? "3px solid black" : "none";
    });
}


// Color a node
function colorNode(node) {
    if (!selectedColor) {
        alert("Please select a color first!");
        return;
    }

    const nodeId = parseInt(node.dataset.id);
    const problem = problems[currentProblemIndex];
    const adjacencyMatrix = problem.adjacencyMatrix;

    // Check for conflicts with neighbors
    const neighbors = adjacencyMatrix[nodeId];
    const hasConflict = neighbors.some((isConnected, neighborId) => {
        if (isConnected) {
            const neighborNode = document.querySelector(`circle[data-id="${neighborId}"]`);
            return window.getComputedStyle(neighborNode).fill === selectedColor;
        }
        return false;
    });

    if (hasConflict) {
        alert("Invalid color! This vertex has a conflict.");
        score = Math.max(0, score - 5); // Prevent negative scores
    } else {
        node.style.fill = selectedColor;
        score += 10; // Award points for correct coloring
    }

    updateScore();
}



// Check solution for conflicts
function checkSolution() {
    // Our check Solution uses the greedy algorithm while taking ideas from breadth first search
    // The concept is to traverse the vertex if they had connection while checking if their the same color. Its so greedy 

    const problem = problems[currentProblemIndex].adjacencyMatrix; // Getting the problem adjacency matrix using the global current Problem Index
    let startVertex = 0; // initializing the queue with 0
    
    visitedNodeIndex = new Set(); // tracking the visited vertex so there will be no redundant travelsal
    queue = []; // queue for the traversal

    queue.push(startVertex);
    problemLength = problem.length;
    
    const message = document.getElementById('message');
    while(queue.length > 0) { // stops at when queue is empty
        const curNodeIndex = queue.shift(); // this is where the FI in FIFO happens

        if(!visitedNodeIndex.has(curNodeIndex)) { // Checking any redundant traversal
            visitedNodeIndex.add(curNodeIndex); // This is where we store our traversal history
            const curVertex = document.querySelector(`circle[data-id="${curNodeIndex}"]`); // getting the current vertex (node) from our DOM

            const curVertexColor = window.getComputedStyle(curVertex).fill;
            for(let neighborVertexIndex = 0; neighborVertexIndex < problemLength; neighborVertexIndex++) { // looping all the neighbor in the current index
                const neighborNode = document.querySelector(`circle[data-id="${neighborVertexIndex}"]`); // getting the neighbor vertex (node) from the DOM
                const neighborVertexColor = window.getComputedStyle(neighborNode).fill;
                const isConnected = problem[curNodeIndex][neighborVertexIndex]; // Getting data from the adjacency matrix if it is 1 or 0 (1 for connected and 0 is not)
                if(isConnected) { // if the data is 1
                    // Check if any vertex is uncolored
                    if ( 
                        curVertexColor === "rgb(0, 0, 0)" ||
                        neighborVertexColor === "rgb(0, 0, 0)"
                    ) {
                        message.textContent = 'Failed! Color all vertices first.';
                        score += -10;
                        updateScore();
                        return;
                    }
                    if(curVertexColor === neighborVertexColor) { // checking if there the
                        console.log(`${curNodeIndex} ${curVertexColor}: ${neighborVertexIndex} ${neighborVertexColor}`);
                        message.textContent = 'Failed! Two vertices has the same color.';
                        score += -10;
                        updateScore();
                        return;
                    }
                }
            }
        }
    }
    // if theres no problem in ifs we may proceed to the next problem
    lastCompletedProblemIndex = currentProblemIndex; // saving the current problem for the undo
    message.textContent = 'Complete! You may go to the next problem...';
    score += 50;
    updateScore();
    setTimeout(nextProblem,1500);
}

function updateScore() {
    document.getElementById('score').textContent = score;
}


// Solve the current problem
function solveProblem() {
    const problem = problems[currentProblemIndex];
    const adjacencyMatrix = problem.adjacencyMatrix;
    const numberOfVertex = adjacencyMatrix.length;
    const colorVertex = new Array(numberOfVertex).fill('black');

    const isSafe = (vertexIndex,color) => {
        for(let neighborIndex = 0; neighborIndex<numberOfVertex; neighborIndex++) {
            if(adjacencyMatrix[vertexIndex][neighborIndex] === 1 && colorVertex[neighborIndex] === color) return false;
        }
        return true;
    };

    const colorGraph = (vertexIndex) => {
        if(vertexIndex === numberOfVertex) return true;
        for(const color of colorsNeeded) {
            if(isSafe(vertexIndex, color)) {
                colorVertex[vertexIndex] = color;
                if(colorGraph(vertexIndex+1)) {
                    return true;
                }
                colorVertex[vertexIndex] = 'black';
            }
        }
        return false;
    }
    colorGraph(0);
    for(let vertexIndex = 0; vertexIndex < numberOfVertex; vertexIndex++) {
        const vertex = document.querySelector(`circle[data-id="${vertexIndex}"]`);
        vertex.style.fill = colorVertex[vertexIndex];
    }
    
}

// Progress to the next problem
function nextProblem() {
    currentProblemIndex++;
    if (currentProblemIndex > Object.keys(problems).length) {
        document.getElementById("message").textContent = "Congratulations! You've solved all problems.";
        document.getElementById("graph").innerHTML = ""; // Clear graph
        document.getElementById("colors").innerHTML = "";
    } else {
        createColorButtons();
        selectProblem(currentProblemIndex);
    }
}

// Reset the current level
function undoLevel() {
    if(lastCompletedProblemIndex !== null) {
        currentProblemIndex = lastCompletedProblemIndex;
        selectProblem(currentProblemIndex);
        createColorButtons();
        document.getElementById('message').textContent = 'Returned to the previous level.'
        if(lastCompletedProblemIndex > 1) {
            lastCompletedProblemIndex -= 1;
        } else {
            lastCompletedProblemIndex = null;
        }
        
    }else {
        document.getElementById('message').textContent = 'No previous level to return.'
    }
}

// Attach undo and initialization to buttons
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("undoButton").addEventListener("click", undoLevel);
    initializeGame();
});
