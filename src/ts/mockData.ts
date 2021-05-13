import {Executor, executorList} from "./executor";
import {addTask, Task} from "./task";

export function fillMockData() {
    fillExecutors();
    fillTasks();
}

function fillTasks() {
    addTask('in-box', new Task({
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet',
        executor: executorList[0]
    }));

    addTask('in-box', new Task({executor: executorList[1], description: 'do do do', title: 'mega Do 1'}));
    addTask('in-box', new Task({executor: executorList[2], description: 'do do do', title: 'mega Do 2'}));
    addTask('todo', new Task({executor: executorList[0], description: 'do do do', title: 'mega Do 3'}));
    addTask('todo', new Task({executor: executorList[1], description: 'do do do', title: 'mega Do 4'}));
}

function fillExecutors() {
    executorList.push(new Executor('Dmitrii', 'Kliuev'))
    executorList.push(new Executor('Bob', 'Ford'))
    executorList.push(new Executor('Mike', 'Grunt'))
}
