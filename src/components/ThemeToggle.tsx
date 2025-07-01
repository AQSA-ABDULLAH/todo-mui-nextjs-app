import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}

export default function ThemeToggle({ mode, setMode }: ThemeToggleProps) {
  const theme = useTheme();

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={toggleMode} sx={{ ml: 'auto' }} color="inherit">
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
