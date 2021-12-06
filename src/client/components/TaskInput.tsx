import { Button, Grid, TextField, Tooltip, Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { getPropertyFromIntegration, getItemName } from '../utils';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    width: 200,
    padding: '4px 12px',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: '16px',
  },
});

const TaskInput = (props: {
  onTaskCreated: (task: Task) => void;
  installedApp: Feed;
  isLoading: boolean;
  isInstalled: boolean;
}) => {
  const [task, setTask] = useState<Task>({ name: '', description: '' });
  const handleAddTask = async () => {
    props.onTaskCreated(task);
    setTask({ name: '', description: '' });
  };

  const handleChange = (field: string) => (event: any) => {
    setTask({ ...task, [field]: event.target.value });
  };

  return (
    <Grid container spacing={2} display="flex" alignItems="center" mb="80px">
      <Grid item xs={4}>
        <TextField
          color="secondary"
          label={getPropertyFromIntegration(props.installedApp, 0, 'label') || 'Item Name'}
          variant="outlined"
          fullWidth
          onChange={handleChange('name')}
          value={task.name}
        />
      </Grid>
      <Grid item xs={4} ml="15px">
        <TextField
          color="secondary"
          label={getPropertyFromIntegration(props.installedApp, 1, 'label') || 'Item Description'}
          variant="outlined"
          fullWidth
          onChange={handleChange('description')}
          value={task.description}
        />
      </Grid>
      <Grid item xs={3}>
        <StyledTooltip
          sx={{ m: 1 }}
          arrow
          title={
            props.isInstalled
              ? `${props.installedApp.name} will be triggered when you click this button`
              : `Please install an Integration from the Integrations Marketplace first`
          }
        >
          <Box display="inline-block">
            <Button
              disabled={!props.isInstalled || props.isLoading || task.name === '' || task.description === ''}
              variant="contained"
              color="secondary"
              onClick={handleAddTask}
            >
              {props.isLoading ? 'Adding new' : 'Add New'} {getItemName(props.installedApp)}
            </Button>
          </Box>
        </StyledTooltip>
      </Grid>
    </Grid>
  );
};

export default TaskInput;
