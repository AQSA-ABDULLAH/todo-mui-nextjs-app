import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMemo, useState } from 'react';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}
