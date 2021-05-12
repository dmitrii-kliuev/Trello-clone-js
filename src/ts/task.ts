interface ITask {
    title: string;
    description: string;
    executor: string;
}

export class Task {
    id: number;
    title: string;
    description: string;
    executor: string;

    constructor(options: ITask = {title: 'UNSET', description: 'UNSET', executor: 'UNSET'}) {
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

export function createTaskColumnElementHtml(columnName: string): string {
    const columnTasks = tasks[columnName];
    const tasksHTML = columnTasks.map(t => createTaskElementHTML(t)).join('');

    return `
    <div class="column" id="${columnName}">
        <div class="column__header">
            <div class="taskCounter">${columnTasks.length}</div>
            <div class="column__title">${columnName}</div>
            <div class="column__menu">
                <i class="fas fa-plus"></i>
            </div>
        </div>
        <div class="taskList">${tasksHTML}</div>
        <label for="modal_1" class="addTask">
            <i class="fas fa-plus"></i>
            Add another task...
        </label>
    </div>
    `;
}

export function createTaskElementHTML(task: Task): string {
    return `
        <div class="task" data-id="${task.id}">
            <div class="task__title">${task.title}</div>
            <div class="task__description">${task.description}</div>
            <div class="task__executor">${task.executor}</div>
        </div>
        `;
}

export interface ITasks {
    [key: string]: Task[];
}
