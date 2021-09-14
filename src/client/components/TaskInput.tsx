import {Button, Grid, TextField} from "@material-ui/core";

const TaskInput = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <TextField label="Task Name" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={5}>
                <TextField label="Task Details" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary">Add New Task</Button>
            </Grid>
        </Grid>
    )
};

export default TaskInput;