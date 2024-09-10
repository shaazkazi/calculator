import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, Container } from '@mui/material';
import './App.css';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', 'AC', '=', '+'],  // Changed 'C' to 'AC' for All Clear
];

function App() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === 'AC') {
      setInput('');  // Clear everything
    } else if (value === '=') {
      try {
        const result = eval(input);  // Safely evaluate the input expression
        setInput(result.toString());
      } catch (error) {
        setInput('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleKeyPress = (e) => {
    const { key } = e;

    if (['+', '-', '*', '/', 'Enter', 'Backspace', 'Escape'].includes(key) || (!isNaN(key) && key !== ' ')) {
      if (key === 'Enter') {
        handleClick('=');
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === 'Escape') {
        setInput('');  // Reset the calculator when pressing Escape
      } else {
        setInput((prev) => prev + key);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input]);

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }} className="container">
      <Box component="form" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          InputProps={{ readOnly: true }}
          inputProps={{
            style: {
              textAlign: 'right',
              fontSize: '2.5rem',   // Larger font size for number display
              color: '#fff',         // White color for input text (for dark background)
              fontWeight: 'bold',    // Bold numbers for emphasis
              letterSpacing: '0.1em', // Add slight spacing between characters for smooth look
            },
            placeholder: '0',       // Placeholder for input
          }}
          sx={{
            backgroundColor: '#333', // Dark grey background for number input field
            borderRadius: '10px',    // Rounded corners for smoother look
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {buttons.flat().map((btn) => (
          <Grid item xs={3} key={btn}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleClick(btn)}
              sx={{
                height: 70,
                fontSize: '1.5rem',
                fontWeight: 'bold',                // Make the button text bold
                backgroundColor: ['+', '-', '*', '/', '='].includes(btn) ? '#32c84b' : '#ff0082', // Color 2: Green for operators, Color 1: Pink for numbers
                color: '#000',                      // White text for button
                '&:hover': {
                  backgroundColor: ['+', '-', '*', '/', '='].includes(btn) ? '#28a745' : '#e6006e', // Darker hover effect
                },
                borderRadius: '10px',               // Rounded corners for buttons
              }}
            >
              {btn}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
