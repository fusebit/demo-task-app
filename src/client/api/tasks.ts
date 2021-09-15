// @ts-nocheck
import {Task} from "../components/Types";
const headers = {
    "Content-Type":"application/json; charset=utf-8"
};
export const getTasks = async () => {
    const response = await fetch('/api/task', {headers});
    return response.json();
};

export const saveTask = async (task: Task) => {
    const response = await fetch('/api/task', {headers, method: 'POST', body: JSON.stringify(task)});
    return response.json();
};