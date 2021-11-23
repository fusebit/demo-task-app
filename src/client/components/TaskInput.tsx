import { Button, Grid, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    width: 200,
    padding: '4px 12px',
    textAlign: 'center',
  },
});

const TaskInput = (props: { onTaskCreated: (task: Task) => void; isInstalled: boolean }) => {
  const [task, setTask] = useState<Task>({ name: '', description: '' });
  const [tooltipOpen, setTooltipOpen] = useState(false);
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
        <TextField label="Task Name" variant="outlined" fullWidth onChange={handleChange('name')} value={task.name} />
      </Grid>
      <Grid item xs={4} ml="15px">
        <TextField
          label="Task Detail"
          variant="outlined"
          fullWidth
          onChange={handleChange('description')}
          value={task.description}
        />
      </Grid>
      <Grid item xs={2} ml="15px">
        <CustomWidthTooltip
          sx={{ m: 1 }}
          arrow
          title={
            props.isInstalled
              ? 'Your integration will be triggered when you click this button'
              : 'Please install the Slack Integration from the Integrations Marketplace first'
          }
        >
          <span style={{ display: 'block' }}>
            <Button disabled={!props.isInstalled} variant="contained" color="secondary" onClick={handleAddTask}>
              Add New Task
            </Button>
          </span>
        </CustomWidthTooltip>
      </Grid>
    </Grid>
  );
};

export default TaskInput;
