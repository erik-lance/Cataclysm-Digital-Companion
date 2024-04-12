import React, { useState, useEffect } from 'react';
import { Slider, Grid, IconButton, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

interface AvatarData {
  id: number;
  name: string;
  image: string; // URL of the avatar image
  value: number;
}

const initialAvatars: AvatarData[] = [
  { id: 1, name: 'Player 1', image: '/avatars/Avatar 1.png', value: 9 },
  { id: 2, name: 'Player 2', image: '/avatars/Avatar 2.png', value: 9 },
  { id: 3, name: 'Player 3', image: '/avatars/Avatar 3.png', value: 9 },
  { id: 4, name: 'Player 4', image: '/avatars/Avatar 4.png', value: 9 },
];

export default function Game() {
  const [avatars, setAvatars] = useState<AvatarData[]>(initialAvatars);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [nonZeroAvatarNames, setNonZeroAvatarNames] = useState<string[]>([]);

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

  return (
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

            <Grid item xl lg md sm xs> {/* Description */}
                <Typography variant="h5" align="center" gutterBottom>
                    This is the game page.
                </Typography>
            </Grid>

            <Grid item xl lg md sm xs> {/* Description */}
                <Button variant="contained" color="primary">
                    Next Cycle
                </Button>
            </Grid>

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
                    max={9}
                    step={1}
                    aria-labelledby="continuous-slider"
                    sx={{width: '150px', '& .MuiSlider-valueLabel': { backgroundColor: 'transparent' } }} // Adjust slider width and value label background
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
  );
};

