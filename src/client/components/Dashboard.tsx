import {Task} from "./Types";
import StatusPaper from "./StatusPaper";
import {Typography} from "@material-ui/core";
import TaskInput from "./TaskInput";
import React, {useEffect, useState} from "react";
import TaskTable from "./TaskTable";
import PageItem from './PageItem';
import Page from './Page';
import {Tasks} from "../api";

export default () => {
    const [tasks, setTasks] = useState<{name: string, description: string}[]>([]);
    const [doRefresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
        if (!doRefresh) {
            return;
        }
        Tasks.getTasks()
                .then(tasks => {
                    setTasks(tasks);
                    setRefresh(false);
                });
    }, [doRefresh]);

    const handleTaskCreated = async (task: Task) => {
        await Tasks.saveTask(task);
        setRefresh(true);
    }
    return (
        <Page>
            <PageItem>
                <StatusPaper elevation={24}>
                    <Typography>Fusebit Integrations in Action!</Typography>
                    <p>Fusebit automatically checks if the specific user (or tenant) has installed the integration in their account.  You can use this information to enable / disable different actions in the system.</p>
                    <p>In this example, the "Add New Task" Button, if installed, will use your integration code to immediately update your tenant via Slack!  Look at the code to see how it works, and learn more in the docs here.</p>
                </StatusPaper>
            </PageItem>
            <PageItem>
                <TaskInput onTaskCreated={handleTaskCreated}/>
            </PageItem>
            <PageItem>
                <TaskTable tasks={tasks}/>
            </PageItem>
        </Page>
    )
}