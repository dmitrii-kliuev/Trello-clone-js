import {tasks} from "./task";
import {executorList} from "./executor";

const tasksStorageKey = 'tasks';
const executorsStorageKey = 'executors';

export function saveTasksToStorage() {
    localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
}

export function initializeTasksFromStorage(): boolean {
    const tasksInStorageJSON = localStorage.getItem(tasksStorageKey);
    if (tasksInStorageJSON) {
        const tasksInStorage = JSON.parse(tasksInStorageJSON)
        for (const column of Object.keys(tasksInStorage)) {
            if (!tasks[column]) {
                tasks[column] = [];
            }
            tasks[column].push(...tasksInStorage[column])
        }

        return true;
    }

    return false;
}

export function saveExecutorsToStorage() {
    localStorage.setItem(executorsStorageKey, JSON.stringify(executorList));
}

export function initializeExecutorsFromStorage(): boolean {
    const executorsJSON = localStorage.getItem(executorsStorageKey)
    if(executorsJSON) {
        const executors = JSON.parse(executorsJSON);

        executorList.push(...executors);

        return true;
    }
    return false;
}
