import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Typography, Box, Alert, AlertTitle } from '@mui/material';

export default function PopoverComponent(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ cursor: 'pointer' }}
      >
        {props.tipo}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {/*<Box sx={{ p: 1, backgroundColor: props.color }}>
          <Typography color='white' variant='h6'>{props.titulo}</Typography>
          <Typography color='white'>{props.text}</Typography>
        </Box>*/}
        <Alert
          variant="filled"
          sx={{
            backgroundColor: props.alert === 'xtreme' ? props.color : '',
            color: props.alert === 'xtreme' ? 'white' : ''
          }}

          severity={props.alert}

        >
          <AlertTitle>{props.titulo}</AlertTitle>
          <Typography variant="caption">{props.text}</Typography>
        </Alert>
      </Popover>
    </Box >
  );
}
