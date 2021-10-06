import React from 'react';
import { Fab, Popover, Typography } from '@mui/material';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const SlackAction = (props: { isInstalled: boolean }) => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const divRef = React.useRef();

  const handlePopoverOpen = () => {
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const text = props.isInstalled ? 'Slack Notifications Are Active' : 'Integrate With Slack';

  const SlackImage = (props: any) => (
    <img
      style={{ height: 48 }}
      src="https://netstorage.ringcentral.com/dpw/apps/53N5jaZ0Q0a9Nv93-HrvLQ/6d811d6c-a338-4696-902c-fa6007971d25-1210.png"
      {...props}
    />
  );

  const SlackButton = () =>
    props.isInstalled ? (
      <div className="center-icons">
        <SlackImage href="/marketplace" />
        <NotificationsActiveIcon sx={{ color: 'green' }} className="big-icon" />
      </div>
    ) : (
      <div className="center-icons">
        <Fab style={{ backgroundColor: '4A154B' }} href="/marketplace">
          <SlackImage />
        </Fab>
        <AddAlertIcon sx={{ color: 'blue' }} className="big-icon" />
      </div>
    );

  return (
    <React.Fragment>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={!!anchorEl}
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
        <Typography sx={{ p: 1 }}>{text}</Typography>
      </Popover>
      <div
        aria-describedby={'mouse-over-popover'}
        ref={divRef}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <SlackButton />
      </div>
    </React.Fragment>
  );
};

export default SlackAction;
