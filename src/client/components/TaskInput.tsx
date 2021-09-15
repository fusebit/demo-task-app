import {Button, Grid, TextField} from "@material-ui/core";
import {Task} from "./Types";
import {useState} from "react";
import {Tasks} from '../api';

const TaskInput = (props: {onTaskCreated: (task: Task) => void}) => {
    const [task, setTask] = useState<Task>({name: '', description: ''})
    const handleAddTask = async () => {
        // validation, if you like...
        props.onTaskCreated(task);
        setTask({name: '', description: ''});
    }

    const handleChange = (field: string) => (event: any) => {
        setTask({...task, [field]: event.target.value});
        console.log(task);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <TextField label="Task Name" variant="filled" fullWidth onChange={handleChange('name')}/>
            </Grid>
            <Grid item xs={5}>
                <TextField label="Task Description" variant="filled" fullWidth onChange={handleChange('description')}/>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={handleAddTask}>Add New Task</Button>
            </Grid>
        </Grid>
    )
};

export default TaskInput;