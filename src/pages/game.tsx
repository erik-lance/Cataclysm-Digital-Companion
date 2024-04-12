import React, { useState, useEffect } from 'react';
import { Slider, Grid, IconButton, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

interface AvatarData {
  id: number;
  name: string;
  image: string; // URL of the avatar image
  value: number;
}

const initialAvatars: AvatarData[] = [
  { id: 1, name: 'Slick', image: '/avatars/Avatar 1.png', value: 9 },
  { id: 2, name: 'Tabby', image: '/avatars/Avatar 2.png', value: 9 },
  { id: 3, name: 'Whisper', image: '/avatars/Avatar 3.png', value: 9 },
  { id: 4, name: 'Arson', image: '/avatars/Avatar 4.png', value: 9 },
];

export default function Game() {
  const [avatars, setAvatars] = useState<AvatarData[]>(initialAvatars);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [nonZeroAvatarNames, setNonZeroAvatarNames] = useState<string[]>([]);
  const [cycleCount, setCycleCount] = useState(0);

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

            <Grid item xs={4}> {/* Avatar Image and Name */}
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  {/*Avatar Image*/}
                  <Avatar
                    alt={avatar.name}
                    src={avatar.image}
                    sx={{ width: 100, height: 100 }} // Adjust size of the avatar
                  />
                </Grid>
                 {/*Avatar Name*/}
                <Grid item>
                  <Typography variant="subtitle1" align="center" fontWeight='bold'>
                    {avatar.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8} sm={8} md={8} lg={8}> {/* Slider and Buttons */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                   {/*Decrement Button*/}
                  <IconButton
                    onClick={() => handleDecrement(avatar.id)}
                    style={{ color: 'white'}} 
                  >
                    <ArrowLeft />
                  </IconButton>
                </Grid>

                {/*Slider*/} 
                <Grid item xs>
                  <Slider
                    value={avatar.value}
                    onChange={(e, newValue) => handleSliderChange(avatar.id, newValue as number)}
                    min={0}
                    max={9}
                    step={1}
                    aria-labelledby="continuous-slider"
                    sx={{ width: '100px', '& .MuiSlider-valueLabel': { backgroundColor: 'transparent' } }} // Adjust slider width and value label background
                    valueLabelDisplay="on"
                  />
                </Grid>

                 {/*Increment Button*/}
                <Grid item>
                  <IconButton
                    onClick={() => handleIncrement(avatar.id)}
                    style={{ color: 'white'}} 
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
