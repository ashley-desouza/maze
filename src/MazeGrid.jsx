import './MazeGrid.css'
import { useState, useEffect } from 'react'

export default function MazeGrid({ width = 20, height = 20 }) {
	// Generate an initial maze grid - For reference this is what the maze should look like
	/*
	const initialMaze = [
		['wall', 'wall', 'wall', 'wall'],
		['start', 'path', 'path', 'path'],
		['wall', 'wall', 'path', 'wall'],
		['wall', 'wall', 'path', 'end'],
		['wall', 'wall', 'wall', 'wall']
	];
	*/

	const [maze, setMaze] = useState([]);
	const [timeoutIds, setTimeoutIds] = useState([]);

	// Render the initial maze grid
	useEffect(() => {
		generateMaze(width, height);
	}, []);

	function breadthFirstSearch(startNode) {
		// The first step is to add the start node to the queue
		const queue = [startNode];

		// Add the start node to the list of visited nodes
		// NOTE: Use a Set data structure here as it is easier to manage when checking if a node has been visited
		const visited = new Set(`${startNode[0]}, ${startNode[1]}`);

		// Helper Function to perform actions when visiting a node
		function visitCell(x, y) {
			console.log(`[BFS] x: ${x}, y: ${y}`);

			// Update the cell being evaluated (using the input x and y co-ordinates) to be 'visited' unless it is the 'end' cell.
			setMaze((prevMaze) => 
				prevMaze.map((row, rowIndex) =>
					row.map((cell, cellIndex) => {
						// Found the cell with the provided input x and y co-oridnates.
						// Update it to be 'visited', unless it is the 'end' cell.
						if (cellIndex === x && rowIndex === y) {
							return cell === 'end' ? 'end' : 'visited';
						}

						// Cell does not match the provided input x and y co-oridnates. Leave it as is.
						return cell;
					})
				)
			);

			// If the cell we are visiting is the 'end' cell, exit out and return true to indicate that the 'end' of the maze has been found.
			if (maze[y][x] === 'end') {
				console.log('[BFS] Path found!');
				return true;
			}

			// 'end' cell not yet found. Exit and return false
			return false;
		}

		// Helper function to process next cell in the queue.
		function processCell() {
			// Check if the queue is empty. If it is empty, exit out and return false
			if (queue.length === 0) {
				return false;
			}

			// Get the 1st cell from the queue.
			const [x, y] = queue.shift();

			// Array of all possible directions (neighbors)
			const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

			// Loop over all possible directions (neighbors)
			for (let [dx, dy] of dirs) {
				// New X co-ordinate. Possible path in X-direction
				const newX = x + dx;

				// New Y co-ordinate. Possible path in Y-direction
				const newY = y + dy;

				// Check if the new cell, defined by the New X and New Y co-ordinates, is a valid cell
				if (newX >= 0 && newX < width && newY >= 0 && newY < height && !visited.has(`${newX}, ${newY}`)) {
					// Add the neighbor cell to the list of visited nodes
					visited.add(`${newX}, ${newY}`);

					// Check if the neighboring cell is a 'path' cell or it is the 'end' cell
					if (maze[newY][newX] === 'path' || maze[newY][newX] === 'end') {
						// Visit the cell and process it
						if (visitCell(newX, newY)) {
							// The visitCell method has returned true. This indicates that the 'end' cell has been found.
							// Exit out of the breadthFirstSearch method and return true.
							return true;
						}

						// If visitCell method has not returned true, it indicates that the neighbor cell is a 'path' cell.
						// Add this cell to the queue for further processing.
						queue.push([newX, newY]);
					}
				}
			}

			// Process the next cell in the stack.
			const timeoutId = setTimeout(processCell, 100);

			setTimeoutIds(prevTimeoutIds => [...prevTimeoutIds, timeoutId]);
		}

		// Call the processCell method to start processing nodes from the queue.
		processCell();

		// If we get to this point and we still have not found the 'end' cell, then exit and return false.
		// The 'end' of the maze was not found
		return false;
	}

	function depthFirstSearch(startNode) {
		const stack = [startNode];

		const visited = new Set(`${startNode[0]}, ${startNode[1]}`);

		function visitCell(x, y) {
			console.log(`[DFS] x: ${x}, y: ${y}`);
			
			// Update the cell being evaluated (using the input x and y co-ordinates) to be 'visited' unless it is the 'end' cell.
			setMaze(prevMaze =>
				prevMaze.map((row, rowIndex) =>
					row.map((cell, cellIndex) => {
						// Found the cell with the provided input x and y co-oridnates.
						// Update it to be 'visited', unless it is the 'end' cell.
						if (rowIndex === y && cellIndex === x) {
							return cell === 'end' ? 'end' : 'visited';
						}

						// Cell does not match the provided input x and y co-oridnates. Leave it as is.
						return cell;
					})
				)
			);

			if (maze[y][x] === 'end') {
				console.log('[DFS] Path found!');
				return true;
			}

			return false;
		}

		function processCell() {
			// Check if the stack is empty. If it is empty, exit out and return false
			if (stack.length === 0) {
				return false;
			}

			// Get the 1st cell from the stack.
			const [x, y] = stack.pop();

			// Array of all possible directions (neighbors)
			const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

			// Loop over all possible directions (neighbors)
			for (let [dx, dy] of dirs) {
				// New X co-ordinate. Possible path in X-direction
				const newX = x + dx;

				// New Y co-ordinate. Possible path in Y-direction
				const newY = y + dy;

				// Check if the new cell, defined by the New X and New Y co-ordinates, is a valid cell
				if (newX >= 0 && newX < width && newY >= 0 && newY < height && !visited.has(`${newX}, ${newY}`)) {
					// Add the neighbor cell to the list of visited nodes
					visited.add(`${newX}, ${newY}`);

					// Check if the neighboring cell is a 'path' cell or it is the 'end' cell
					if (maze[newY][newX] === 'path' || maze[newY][newX] === 'end') {
						// Visit the cell and process it
						if (visitCell(newX, newY)) {
							// The visitCell method has returned true. This indicates that the 'end' cell has been found.
							// Exit out of the breadthFirstSearch method and return true.
							return true;
						}

						// If visitCell method has not returned true, it indicates that the neighbor cell is a 'path' cell.
						// Add this cell to the stack for further processing.
						stack.push([newX, newY]);
					}
				}
			}

			// Process the next cell in the stack.
			const timeoutId = setTimeout(processCell, 100);

			setTimeoutIds(prevTimeoutIds => [...prevTimeoutIds, timeoutId]);
		}

		// Call the processCell method to start processing nodes from the stack.
		processCell();

		// If we get to this point and we still have not found the 'end' cell, then exit and return false.
		// The 'end' of the maze was not found
		return false;
	}

	function generateMaze(height, width) {
		// Start with an empty 2x2 matrix
		const matrix = [];

		for (let i = 0; i < height; i++) {
			// Form the rows
			const rows = [];

			for (let j = 0; j < width; j++) {
				// Initially make everything a 'wall'
				rows.push('wall');
			}
			matrix.push(rows);
		}

		function isValidCell(x, y) {
			// Cell is valid i.e. can be transformed to a 'path' if the following conditions are met -
			// 		1. Within the bounds of the maze along the x-axis (width)
			// 		2. Within the bounds of the maze along the y-axis (height)
			// 		3. The current cell being evaluated is a 'wall'
			return x >= 0 && x < width && y >= 0 && y < height && matrix[y][x] === 'wall';
		}

		function carvePath(x, y) {
			matrix[y][x] = 'path';

			// Define all 4 possible options to move
			// 		1. [0, 1] -> move down by 1
			// 		2. [1, 0] -> move to the right by 1
			// 		3. [0, -1] -> move up by 1
			// 		4. [-1, 0] -> move to the left by 1
			const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
	
			// Shuffle the dirs array so that we pick a direction at random
			const directions = dirs.sort(() => Math.random() - 0.5);
	
			// Loop over all the possible directions
			for (let [dx, dy] of directions) {
				// Task - Check that we are not formaing a loop
				// Find the new position + the next position i.e. [0, 2] or [2, 0]
				// Define New 2X and New 2Y co-ordinates
				const next2X = x + dx * 2;
				const next2Y = y + dy * 2;

				// Check if the New 2X and New 2Y positions are valid cells (to avoid forming loops)
				if (isValidCell(next2X, next2Y)) {
					// The next + next cell is valid.
					// So, we can mark the next cell as a 'path'
					matrix[y + dy][x + dx] = 'path';

					// Now, continue carving a path by providing the next + next cell as the cell to be evaulated.
					carvePath(next2X, next2Y);
				}
			}
		}

		carvePath(1, 1);
		matrix[1][0] = 'start';
		matrix[height - 2][width - 1] = 'end';

		setMaze(matrix);
	}

	function refreshMaze() {
		// Clear all setTimeout objects waiting in the queue.
		timeoutIds.forEach(clearTimeout);

		// Reset all timeoutIds to be an empty array.
		setTimeoutIds([]);

		// Generate a new maze of using the provided input width and height.
		generateMaze(height, width);
	}

	return (
		<div className="maze-grid">
			<div className={'controls'}>
				<button className={'maze-button'} onClick={() => refreshMaze()}>Refresh Maze</button>
				<button className={'maze-button'} onClick={() => breadthFirstSearch([1, 0])}>Start Breadth First Search</button>
				<button className={'maze-button'} onClick={() => depthFirstSearch([1, 0])}>Start Depth First Search</button>
			</div>
			<div className={'maze'}>
				{
					maze.map((row, rowIndex) => (
						<div key={rowIndex} className={'row'}>
							{
								row.map((cell, cellIndex) => (
									<div key={`${rowIndex}-${cellIndex}`} className = {`cell ${cell}`}></div>
								))
							}
						</div>
					))
				}
			</div>
		</div>
	)
}
