ToDo App using Next js and MUI

## Features:
1. Add, edit, delete tasks
2. Mark tasks as completed or pending
3. Filter by: All / Completed / Pending
4. Sort tasks by creation date or status
5. Dark/Light mode toggle using MUI’s theme system
6. Fully responsive UI (mobile, tablet, desktop)
7. Persistent storage using localStorage
8. Clean, modular component structure with TypeScript


## Tech Stack
+ Next.js
+ React 18
+ Material UI
+ TypeScript
+ LocalStorage API


## Getting Started

1. First, Clone the Repository

```bash
git clone https://github.com/your-username/todo-mui-app.git
cd todo-mui-app
```

2. Install Dependencies

```bash
npm install
# or
yarn install
```

3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

## Project Structure
src/
├── components/       // Reusable UI components (TaskList, TaskForm, etc.)
├── context/          // Theme context for light/dark mode
├── pages/            // index.tsx (main app UI)
├── styles/           // Global styles
├── types/            // Shared TypeScript types