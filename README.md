# Maze Pathfinder

An interactive maze pathfinding visualization built with React and Vite. Watch as different pathfinding algorithms navigate through procedurally generated mazes in real-time.

## Features

- **Procedural Maze Generation**: Uses recursive backtracking algorithm to generate unique mazes
- **Pathfinding Algorithms**: 
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
- **Real-time Visualization**: Watch the algorithms explore the maze step-by-step
- **Interactive Controls**: Generate new mazes and run pathfinding algorithms with the click of a button

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ashley-desouza/maze.git
cd maze
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## How It Works

### Maze Generation

The maze is generated using a recursive backtracking algorithm:
1. Start with a grid of walls
2. Carve paths by moving two cells at a time
3. Randomly shuffle directions to create unique mazes
4. Set start position at (1, 0) and end position at (height-2, width-1)

### Pathfinding Algorithms

- **BFS (Breadth-First Search)**: Explores all neighbors at the current depth before moving to the next level. Guarantees finding the shortest path.
- **DFS (Depth-First Search)**: Explores as far as possible along each branch before backtracking. May not find the shortest path but can be faster.

Both algorithms are visualized in real-time, showing visited cells in light blue and the final path (when found).

## Project Structure

```
maze/
├── public/
│   └── vite.svg          # Vite logo
├── src/
│   ├── MazeGrid.jsx      # Main maze component with generation and pathfinding
│   ├── MazeGrid.css      # Styling for the maze
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## License

See LICENSE file for details.

## Future Enhancements

- Add more pathfinding algorithms (A*, Dijkstra)
- Allow users to customize maze size
- Add speed controls for visualization
- Implement path reconstruction visualization
- Add statistics (cells visited, path length, time taken)
