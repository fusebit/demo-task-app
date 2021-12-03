import { Button, Grid, TextField, Tooltip, Box } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { getPropertyFromIntegration } from '../utils';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
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

const TaskInput = (props: { onTaskCreated: (task: Task) => void; installedApp: Feed }) => {
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
          label={getPropertyFromIntegration(props.installedApp, 0, 'label')}
          variant="outlined"
          fullWidth
          onChange={handleChange('name')}
          value={task.name}
        />
      </Grid>
      <Grid item xs={4} ml="15px">
        <TextField
          color="secondary"
          label={getPropertyFromIntegration(props.installedApp, 1, 'label')}
          variant="outlined"
          fullWidth
          onChange={handleChange('description')}
          value={task.description}
        />
      </Grid>
      <Grid item xs={3}>
        <CustomWidthTooltip
          sx={{ m: 1 }}
          arrow
          title={
            !!props.installedApp
              ? 'Your integration will be triggered when you click this button'
              : `Please install a Integration from the Integrations Marketplace first`
          }
        >
          <Box>
            <Button
              disabled={!props.installedApp || task.name === '' || task.description === ''}
              variant="contained"
              color="secondary"
              onClick={handleAddTask}
            >
              Add New Task
            </Button>
          </Box>
        </CustomWidthTooltip>
      </Grid>
    </Grid>
  );
};

export default TaskInput;
