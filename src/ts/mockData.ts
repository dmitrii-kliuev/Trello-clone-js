import {Executor, executorList} from "./executor";
import {addTask, Task} from "./task";
import {
    initializeExecutorsFromStorage,
    initializeTasksFromStorage,
    saveExecutorsToStorage,
    saveTasksToStorage
} from "./storage";

export function fillMockData() {
    fillExecutors();
    fillTasks();
}

function fillTasks() {
    if (initializeTasksFromStorage()) {
        return;
    }

    addTask('in-box', new Task({
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet',
        executor: executorList[0]
    }));

    const mockText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti impedit, incidunt iure quis repellat tempora?';

    addTask('in-box', new Task({executor: executorList[1], description: mockText, title: 'mega Do 1'}));
    addTask('in-box', new Task({executor: executorList[2], description: mockText, title: 'mega Do 2'}));
    addTask('todo', new Task({executor: executorList[0], description: mockText, title: 'mega Do 3'}));
    addTask('todo', new Task({executor: executorList[1], description: mockText, title: 'mega Do 4'}));

    addTask('in-progress', new Task({executor: executorList[0], description: mockText, title: 'mega Do 5'}));
    addTask('review', new Task({executor: executorList[1], description: mockText, title: 'mega Do 6'}));
    addTask('done', new Task({executor: executorList[2], description: mockText, title: 'mega Do 7'}));

    saveTasksToStorage();
}

function fillExecutors() {
    if (initializeExecutorsFromStorage()) {
        return;
    }

    executorList.push(new Executor('Dmitrii', 'Kliuev'))
    executorList.push(new Executor('Bob', 'Ford'))
    executorList.push(new Executor('Mike', 'Grunt'))

    saveExecutorsToStorage();
}
