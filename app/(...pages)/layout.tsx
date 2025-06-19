'use client';

import Header from '@/app/components/Header';
import { ScrollTop } from '../components/BackToTop';
import { Box, Fab} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../components/Footer';

const darkTheme = createTheme({
  palette:{
    mode: "dark",
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Header />
        <span id="back-to-top-anchor" />
        
        <Box component="main" flexGrow={1}>
          {children}
        </Box>

        <Box component="footer" textAlign="center">
          <Footer />
        </Box>

        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </ThemeProvider>
  );
}
