import '../index.html';
import '../scss/main.scss';
import {Task} from "./task";

const str: string = `
[
'in-box': ['task1','task2'],
'todo': ['task3', 'task4'],
'progress': ['task5', 'task6'],
'review': ['task7', 'task8'],
'done': ['task9', 'task10'], 
]`;

interface Foo {
    [key: string]: Task[];
}

let foo: Foo = {};
foo['in-box'] = [];
foo['in-box'].push(new Task({executor: 'Vasya', description: 'do do do', title: 'mega Do 1'}))
foo['in-box'].push(new Task({executor: 'Mike', description: 'do do do', title: 'mega Do 2'}))

foo['todo'] = [];
foo['todo'].push(new Task({executor: 'Dmitrii', description: 'do do do', title: 'mega Do 3'}))
foo['todo'].push(new Task({executor: 'Petr', description: 'do do do', title: 'mega Do 4'}))

console.log(foo);

for (const task of foo['todo']) {
    console.log(task.executor)
}
