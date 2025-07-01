import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, ToggleButtonGroup, ToggleButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import ThemeToggle from '@/components/ThemeToggle';
import { Task } from '@/types/task';

export default function Home({ mode, setMode }: { mode: 'light' | 'dark'; setMode: (mode: 'light' | 'dark') => void }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      if (exists) {
        return prev.map((t) => (t.id === task.id ? task : t));
      }
      return [...prev, task];
    });
    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (_: any, newFilter: 'all' | 'completed' | 'pending') => {
    if (newFilter) setFilter(newFilter);
  };

  const handleSortChange = (e: any) => {
    setSortBy(e.target.value);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return Number(a.completed) - Number(b.completed);
      }
    });

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">ToDo App</Typography>
        <ThemeToggle mode={mode} setMode={setMode} />
      </Box>

      <TaskForm onSave={handleSave} editingTask={editingTask} onCancel={() => setEditingTask(null)} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
          <ToggleButton value="pending">Pending</ToggleButton>
        </ToggleButtonGroup>

        <FormControl size="small">
          <InputLabel>Sort</InputLabel>
          <Select value={sortBy} label="Sort" onChange={handleSortChange}>
            <MenuItem value="date">By Date</MenuItem>
            <MenuItem value="status">By Status</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </Container>
  );
}
