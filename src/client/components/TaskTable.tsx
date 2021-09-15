import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Task} from "./Types";

const TaskTable = (props: {tasks: Task[]}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task Name</TableCell>
                        <TableCell align="left">Task Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tasks.map((task) => (
                        <TableRow key={task.name}>
                            <TableCell component="th" scope="row">
                                {task.name}
                            </TableCell>
                            <TableCell align="left">{task.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default TaskTable