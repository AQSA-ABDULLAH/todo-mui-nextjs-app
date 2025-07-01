import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Paper } from '@mui/material';
import { Task } from '@/types/task';

interface TaskFormProps {
  onSave: (task: Task) => void;
  editingTask?: Task | null;
  onCancel?: () => void;
}

export default function TaskForm({ onSave, editingTask, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask: Task = {
      id: editingTask?.id || Date.now().toString(),
      title,
      description,
      completed: editingTask?.completed || false,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
    };
    onSave(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Task Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            {editingTask && onCancel && (
              <Button onClick={onCancel} color="secondary">Cancel</Button>
            )}
            <Button type="submit" variant="contained" color="primary">
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
