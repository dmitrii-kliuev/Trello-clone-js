import '../index.html';
import '../scss/main.scss';
import {addTask, createTaskColumnElementHtml, Task, tasks} from "./task";

const mainWrapperElement = document.querySelector('.mainWrapper');


mainWrapperElement.addEventListener('click', mainWrapperElementClickHandler)

document.addEventListener("DOMContentLoaded", function () {
    const btnAddNewTask = document.querySelector('.btnAddNewTask');

    btnAddNewTask.addEventListener('click', () => {
        const addNewTaskForm = document.getElementById('addNewTaskForm') as HTMLFormElement;
        const columnField = document.getElementById('columnField') as HTMLInputElement;
        const formData = new FormData(addNewTaskForm);

        console.log(columnField.textContent);
        console.log(formData.get('title'))
        console.log(formData.get('description'))
        console.log(formData.get('executor'))

        addTask(columnField.textContent,
            new Task({
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                executor: formData.get('executor') as string
            }));

        renderItemList();
    })
});


function mainWrapperElementClickHandler(event: any) {
    event.stopPropagation();

    const {target} = event;
    const {classList} = target;
    const isAddTaskButton = classList.contains('addTask')

    if (isAddTaskButton) {
        const columnField = document.querySelector<HTMLInputElement>('#columnField');
        columnField.textContent = target.parentNode.id;
    }
}

function fillTasks() {
    addTask('in-box', new Task({
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet',
        executor: 'Bob Marks'
    }));

    addTask('in-box', new Task({executor: 'Vasya', description: 'do do do', title: 'mega Do 1'}));
    addTask('in-box', new Task({executor: 'Mike', description: 'do do do', title: 'mega Do 2'}));
    addTask('todo', new Task({executor: 'Dmitrii', description: 'do do do', title: 'mega Do 3'}));
    addTask('todo', new Task({executor: 'Petr', description: 'do do do', title: 'mega Do 4'}));
}

function renderItemList(): void {
    mainWrapperElement.innerHTML =
        Object
            .keys(tasks)
            .map(columnName => createTaskColumnElementHtml(columnName))
            .join('');
}

function initApplication() {
    fillTasks()
    renderItemList();
}

initApplication();
