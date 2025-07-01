import React from 'react';
import {
  Box, Checkbox, IconButton, Typography, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  return (
    <Paper sx={{ p: 2, mb: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            )}
          </Box>
        </Box>
        <Box>
          <IconButton onClick={() => onEdit(task)}><EditIcon /></IconButton>
          <IconButton onClick={() => onDelete(task.id)} color="error"><DeleteIcon /></IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
