import {Executor} from "./executor";

interface ITask {
    title: string;
    description: string;
    executor: Executor;
}

export class Task {
    id: number;
    title: string;
    description: string;
    executor: Executor;

    constructor(options: ITask = {title: 'UNSET', description: 'UNSET', executor: new Executor('UNSET', 'UNSET')}) {
        const {title, description, executor} = options;

        this.title = title;
        this.description = description;
        this.executor = executor;
        this.id = Date.now() + (Math.floor(Math.random() * 1000001));
    }
}

export const tasks: ITasks = {};

export function addTask(column: string, task: Task): void {
    if (!tasks[column]) {
        tasks[column] = [];
    }

    tasks[column].push(task);
}

export function getTaskById(columnName: string, taskId: number): Task {
    return tasks[columnName].find(t => t.id === taskId)
}

export function createTaskColumnElementHtml(columnName: string): string {
    const columnTasks = tasks[columnName];
    const tasksHTML = columnTasks.map(task => createTaskElementHTML(task)).join('');

    return `
    <div class="column" data-columnName="${columnName}">
        <div class="column__header">
            <div class="taskCounter">${columnTasks.length}</div>
            <div class="column__title">${columnName}</div>
        </div>
        <div class="taskList connectedSortable">${tasksHTML}</div>
        <label for="modal_1" class="addTask">
            <i class="fas fa-plus"></i>
            Add task...
        </label>
    </div>
    `;
}

export function createTaskElementHTML(task: Task): string {
    return `
        <label for="modal_1" class="task editTask" data-taskid="${task.id}">
            <div class="task__title">${task.title}</div>
            <div class="task__description">${task.description}</div>
            <div class="task__executor">${task.executor.fullName}</div>
        </label>
        `;
}

export interface ITasks {
    [key: string]: Task[];
}
