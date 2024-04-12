import React, { useState, useEffect } from 'react';
import { Slider, Grid, IconButton, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Paper } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import Image from 'next/image';

interface AvatarData {
  id: number;
  name: string;
  image: string; // URL of the avatar image
  value: number;
}

interface ModifierData {
  id: number;
  name: string;
  description: string;
  image: string; // URL of the modifier image
}

const initialAvatars: AvatarData[] = [
  { id: 1, name: 'Player 1', image: '/avatars/Avatar 1.png', value: 9 },
  { id: 2, name: 'Player 2', image: '/avatars/Avatar 2.png', value: 9 },
  { id: 3, name: 'Player 3', image: '/avatars/Avatar 3.png', value: 9 },
  { id: 4, name: 'Player 4', image: '/avatars/Avatar 4.png', value: 9 },
];

const modifiers: ModifierData[] = [
  { id: 0, name: 'The Zoomies', description: 'All move cards get +2', image: '/events/Zoomies.png' },
  { id: 1, name: 'Hardcore', description: 'Cats start with 5 lives instead of 9', image: '/events/Hardcore.png' },
];

export default function Game() {
  const [avatars, setAvatars] = useState<AvatarData[]>(initialAvatars);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [nonZeroAvatarNames, setNonZeroAvatarNames] = useState<string[]>([]);
  const [cycleCount, setCycleCount] = useState(0);
  const [showModifiersPrompt, setShowModifiersPrompt] = useState<boolean>(true);
  const [showModifiers, setShowModifiers] = useState(false);
  const [getMaxLives, setMaxLives] = useState(9);
  const [getCurrentModifier, setCurrentModifier] = useState(-1);

  useEffect(() => {
    const zeroValueAvatars = avatars.filter(avatar => avatar.value === 0);
    if (zeroValueAvatars.length >= 3) {
      setShowDialog(true);
      const nonZeroNames = avatars.filter(avatar => avatar.value !== 0).map(avatar => avatar.name);
      setNonZeroAvatarNames(nonZeroNames);
    } else {
      setShowDialog(false);
    }
  }, [avatars]);

  const handleNextCycle = () => {
    setCycleCount(prevCount => prevCount + 1);
  };  

  const handleSliderChange = (id: number, newValue: number) => {
    setAvatars(prevAvatars =>
      prevAvatars.map(avatar =>
        avatar.id === id ? { ...avatar, value: newValue } : avatar
      )
    );
  };

  const handleIncrement = (id: number) => {
    setAvatars(prevAvatars =>
      prevAvatars.map(avatar =>
        avatar.id === id ? { ...avatar, value: Math.min(9, avatar.value + 1) } : avatar
      )
    );
  };

  const handleDecrement = (id: number) => {
    setAvatars(prevAvatars =>
      prevAvatars.map(avatar =>
        avatar.id === id ? { ...avatar, value: Math.max(0, avatar.value - 1) } : avatar
      )
    );
  };

  const prepareModifiers = () => {
    setShowModifiersPrompt(false);
    setShowModifiers(true);
  };

  const activateModifier = (id: number) => {
    if (id === 0) {
      // The Zoomies - All move cards get +2
      // Do nothing
    } else if (id === 1) {
      // Hardcore - Cats start with 5 lives instead of 9
      // Update slider values
      setMaxLives(5);
      handleSliderChange(1, 5);
      handleSliderChange(2, 5);
      handleSliderChange(3, 5);
      handleSliderChange(4, 5);
    }

    setShowModifiers(false);
    setCurrentModifier(id);
  }

  return <>
    <Dialog open={showModifiersPrompt}>
      <DialogTitle>Game Modifiers</DialogTitle>
      <DialogContent>
        <Typography>Would you like to play with modifiers?</Typography>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'white'}} onClick={() => setShowModifiersPrompt(false)}>No</Button>
        <Button style={{ color: 'white'}} onClick={() => prepareModifiers()}>Yes</Button>
      </DialogActions>
    </Dialog> 

    <Dialog open={showModifiers}>
      <DialogTitle>Game Modifiers</DialogTitle>
      <DialogContent>
        <Typography>Choose a modifier</Typography>
        
        <Stack spacing={1} direction="column" alignItems="flex-start" justifyContent="center" mt={2}>
          {/* Adds image from /public as start icon */}
          {/* Makes button use full width of stack with text on the left */}
          {modifiers.map(modifier => (
            <Button
              key={modifier.id}
              variant="contained"
              color="secondary"
              startIcon={<Image src={modifier.image} alt={modifier.name} width={50} height={50} />}
              onClick={() => activateModifier(modifier.id)}

            >
              {modifier.name} - {modifier.description}
            </Button>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'white'}} onClick={() => setShowModifiers(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>

    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      p={3}
    >
      <Grid item xl lg md sm xs> {/* Title */}
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Game
        </Typography>
      </Grid>

      { getCurrentModifier !== -1 && (
        <Grid item xl lg md sm xs> {/* Modifier (if any) */}
          <Grid container alignItems="center">
            <Paper elevation={3} style={{ padding: '10px' }}  sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap:2}}>
              <Grid item>
                <Avatar
                  alt={modifiers[getCurrentModifier].name}
                  src={modifiers[getCurrentModifier].image}
                  sx={{ width: 75, height: 75 }} // Adjust size of the avatar
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" align="left" gutterBottom>
                  {modifiers[getCurrentModifier].name}
                </Typography>
                <Typography variant="body1" align="left" gutterBottom>
                  {modifiers[getCurrentModifier].description}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Grid item xl lg md sm xs> {/* Counter */}
        <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: '30px' }} >
            Cycle Count: {cycleCount}
        </Typography>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleNextCycle} style={{ marginBottom: '20px' }} >
        Next Cycle
      </Button>

      {avatars.map(avatar => (
        <Grid item key={avatar.id}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                alt={avatar.name}
                src={avatar.image}
                sx={{ width: 100, height: 100 }} // Adjust size of the avatar
              />
            </Grid>
          
            <Grid item xs>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <IconButton
                    onClick={() => handleDecrement(avatar.id)}
                    style={{ color: 'white', fontSize: '2rem' }} 
                  >
                    <ArrowLeft />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <Slider
                    value={avatar.value}
                    onChange={(e, newValue) => handleSliderChange(avatar.id, newValue as number)}
                    min={0}
                    max={getMaxLives}
                    step={1}
                    aria-labelledby="continuous-slider"
                    sx={{width: '100px', '& .MuiSlider-valueLabel': { backgroundColor: 'transparent' } }} // Adjust slider width and value label background
                    valueLabelDisplay="on"
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => handleIncrement(avatar.id)}
                    style={{ color: 'white', fontSize: '2rem'}} 
                  >
                    <ArrowRight />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Dialog open={showDialog}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          {nonZeroAvatarNames.map(name => (
            <Typography key={name}>The winner is {name}</Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button href="/" style={{ color: 'white'}} >Close</Button>
        </DialogActions> 
      </Dialog>
    </Grid>
  </>;
};

