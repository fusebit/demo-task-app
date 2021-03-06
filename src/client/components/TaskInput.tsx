import { Button, Grid, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { getPropertyFromIntegration, getItemName } from '../utils';
import { useCustomColorsContext } from './useCustomColorsContext';
import tinycolor from 'tinycolor2';

const inputStyles = {
  width: '294px',
  '& label.Mui-focused': {
    color: '#333333',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#333333',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#333333',
    },
  },
};

const TaskInput = (props: {
  onTaskCreated: (task: Task) => void;
  appToTest: Feed;
  isLoading: boolean;
  isInstalled: boolean;
}) => {
  const [task, setTask] = useState<Task>({ name: '', description: '' });
  const { colors, isPrimaryColorWhite } = useCustomColorsContext();

  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      width: 200,
      background: tinycolor(!isPrimaryColorWhite ? colors.primary : colors.secondary)
        .setAlpha(0.6)
        .toRgbString(),
      color: tinycolor(!isPrimaryColorWhite ? colors.primary : colors.secondary).isDark() ? '#ffffff' : '#333333',
      padding: '12px',
      textAlign: 'left',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: tinycolor(!isPrimaryColorWhite ? colors.primary : colors.secondary)
        .setAlpha(0.6)
        .toRgbString(),
    },
  });

  const handleAddTask = async () => {
    props.onTaskCreated(task);
    setTask({ name: '', description: '' });
  };

  const handleChange = (field: string) => (event: any) => {
    setTask({ ...task, [field]: event.target.value });
  };

  return (
    <Grid container spacing={2} display="flex" alignItems="center" mb="32px">
      <Grid item>
        <TextField
          sx={inputStyles}
          label={getPropertyFromIntegration(props.appToTest, 0, 'label') || 'Item Name'}
          variant="outlined"
          fullWidth
          onChange={handleChange('name')}
          value={task.name}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={inputStyles}
          label={getPropertyFromIntegration(props.appToTest, 1, 'label') || 'Item Description'}
          variant="outlined"
          fullWidth
          onChange={handleChange('description')}
          value={task.description}
        />
      </Grid>
      <Grid item display="flex">
        <StyledTooltip
          placeholder="top-start"
          arrow
          title={
            props.isInstalled
              ? `${props.appToTest.name} will be triggered when you click this button`
              : `Please install an Integration from the Integrations Marketplace first`
          }
        >
          <span style={{ display: 'block' }}>
            <Button
              sx={{ height: '56px', width: '188px', boxShadow: 'none', textTransform: 'none' }}
              disabled={!props.isInstalled || props.isLoading || task.name === '' || task.description === ''}
              variant="contained"
              color={!isPrimaryColorWhite ? 'primary' : 'secondary'}
              onClick={handleAddTask}
            >
              {props.isLoading ? 'Adding new' : 'Add New'} {getItemName(props.appToTest)}
            </Button>
          </span>
        </StyledTooltip>
      </Grid>
    </Grid>
  );
};

export default TaskInput;
