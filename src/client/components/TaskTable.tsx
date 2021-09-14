import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const TaskTable = (props: {tasks: {name: string, details: string}[]}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task Name</TableCell>
                        <TableCell align="left">Task Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tasks.map((task) => (
                        <TableRow key={task.name}>
                            <TableCell component="th" scope="row">
                                {task.name}
                            </TableCell>
                            <TableCell align="left">{task.details}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default TaskTable