# Data Structure Navigator (数构启航)

English | [简体中文](README.md)

An interactive data structure learning platform to help beginners understand and master the concepts and operations of basic data structures.

## Project Introduction

Data Structure Navigator is a web application developed with Vue 3 + TypeScript + Vite, designed to help users learn basic data structures through visualization and interactive operations. This project provides visual operation interfaces for four common data structures:

- **Array**: Demonstrates index access, insertion, deletion, search, and other operations
- **Linked List**: Demonstrates node connections, insertion, deletion, and other operations
- **Stack**: Demonstrates Last-In-First-Out (LIFO) characteristics, including push and pop operations
- **Queue**: Demonstrates First-In-First-Out (FIFO) characteristics, including enqueue and dequeue operations

In addition to interactive visualizations, the project also includes basic knowledge of data structures and time/space complexity analysis, helping users to deeply understand the characteristics and applicable scenarios of various data structures.

## Features

- Intuitive data structure visualization interface
- Real-time interactive operations with animation effects
- Detailed operation result feedback
- Comprehensive data structure theoretical knowledge
- Time and space complexity analysis
- Responsive design, supporting different devices

## Technology Stack

- **Frontend Framework**: Vue 3
- **Programming Language**: TypeScript
- **Build Tool**: Vite
- **Style Design**: CSS variables and custom styles
- **Animation Effects**: Vue Transition components

## Development and Building

### Requirements

- Node.js 16.0 or higher
- npm 7.0 or higher

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/         # Static resources
│   └── styles/     # Style files
├── components/     # Components
│   ├── ArrayVisualizer.vue       # Array visualization component
│   ├── LinkedListVisualizer.vue  # Linked list visualization component
│   ├── StackVisualizer.vue       # Stack visualization component
│   ├── QueueVisualizer.vue       # Queue visualization component
│   └── TutorialSection.vue       # Tutorial component
├── core/           # Core data structure implementations
│   ├── ArrayDS.ts              # Array data structure
│   ├── LinkedListDS.ts         # Linked list data structure
│   ├── StackDS.ts              # Stack data structure
│   └── QueueDS.ts              # Queue data structure
├── App.vue         # Main application component
└── main.ts         # Application entry point
```

## Contribution Guidelines

Suggestions for improvement or code contributions to this project are welcome. Please participate in project development through Issues or Pull Requests.

## License

[MIT License](LICENSE)
