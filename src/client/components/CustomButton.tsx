import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ListItemButton, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StyledListItemLink = styled(ListItemButton)(() => ({
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

  return (
    <RouterLink to={to && to} style={{ textDecoration: 'none', color: 'white' }}>
      <StyledListItemLink
        onClick={() => onClick()}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Box
          position="absolute"
          left="0"
          bottom="0"
          height="100%"
          width="12px"
          style={{ backgroundColor: '#7986CB', opacity: hovering ? 1 : 0, transition: 'all .15s linear' }}
        />
        {children}
      </StyledListItemLink>
    </RouterLink>
  );
};

export default CustomButton;
