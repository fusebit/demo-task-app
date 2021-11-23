import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ListItemButton, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StyledListItemLink = styled(ListItemButton)((props) => ({
  position: 'relative',
  transition: 'all .15s linear',
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}));

interface Props {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButton = ({ to, onClick, children }: Props) => {
  const [hovering, setHovering] = useState(false);
  const isActive = (() => {
    const linkPath = to;
    if (linkPath) {
      return window.location.pathname === linkPath;
    }
    return false;
  })();

  return (
    <RouterLink to={to || ''} style={{ textDecoration: 'none', color: 'white' }}>
      <StyledListItemLink
        sx={{ backgroundColor: isActive && 'rgba(255,255,255,0.2)' }}
        onClick={() => onClick?.()}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Box
          position="absolute"
          left="0"
          bottom="0"
          height="100%"
          width="12px"
          style={{ backgroundColor: '#7986CB', opacity: hovering || isActive ? 1 : 0, transition: 'all .15s linear' }}
        />
        {children}
      </StyledListItemLink>
    </RouterLink>
  );
};

export default CustomButton;
