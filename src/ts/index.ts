import '../index.html';
import '../scss/main.scss';
import {addTask, createTaskColumnElementHtml, Task, tasks} from "./task";
import {fillMockData} from "./mockData";
import {fillExecutorList, getExecutorById} from "./executor";

const visitedClass = 'visited';
const addMode = 'addMode';
const editMode = 'editMode';

const mainWrapperElement = document.querySelector('.mainWrapper');
const addNewTaskForm = document.getElementById('addNewTaskForm') as HTMLFormElement;
const btnAddUpdateTask = document.querySelector('.btnAddUpdateTask');
const formContent = document.querySelector('.content');

const invalidFormMessage = document.querySelector('.invalidFormMessage') as HTMLDivElement;

const columnField = document.getElementById('columnField') as HTMLInputElement;

const titleElement = document.getElementsByName('title')[0] as HTMLInputElement;
const descriptionElement = document.getElementsByName('description')[0] as HTMLInputElement;
const executorElement = document.querySelector('.executor') as HTMLSelectElement;

mainWrapperElement.addEventListener('click', mainWrapperElementClickHandler)

document.addEventListener("DOMContentLoaded", function () {
    btnAddUpdateTask.addEventListener('click', addNewTaskEventHandler)

    formContent.addEventListener('focusout', checkInput);

    titleElement.addEventListener('click', () => {
        titleElement.classList.toggle(visitedClass, true)
    });

    descriptionElement.addEventListener('click', () => {
        descriptionElement.classList.toggle(visitedClass, true)
    });

    executorElement.addEventListener('click', () => {
        executorElement.classList.toggle(visitedClass, true)
    })
});

function addNewTaskEventHandler(event: any) {
    const executorId = (document.querySelector('.executor') as HTMLOptionElement).value;

    const formData = new FormData(addNewTaskForm);
    const columnName = columnField.textContent;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const executor = getExecutorById(Number(executorId))

    if (!checkInput()) {
        event.stopPropagation();
        event.preventDefault();
        return;
    }

    if (addNewTaskForm.dataset.mode === addMode) {
        addTask(columnName,
            new Task({
                title: title,
                description: description,
                executor: executor
            }));

        addNewTaskForm.dataset.mode = '';
    }

    if (addNewTaskForm.dataset.mode === editMode) {
        console.log('HERE', addNewTaskForm.dataset.taskid)
        const editedTask = tasks[columnName].find(t => t.id === Number(addNewTaskForm.dataset.taskid))
        editedTask.title = title;
        editedTask.description = description;
        editedTask.executor = executor;
    }

    renderItemList();
}

export function checkInput() {
    const executorId = executorElement.value;

    const formData = new FormData(addNewTaskForm);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    setInvalid(titleElement, !title);
    setInvalid(descriptionElement, !description);
    setInvalid(executorElement, !executorId);

    if (!title || !description || !executorId) {
        invalidFormMessage.style.visibility = 'visible';
        return false;
    } else {
        invalidFormMessage.style.visibility = 'hidden';
        return true;
    }
}

function setInvalid(element: any, isInvalid: boolean) {
    if (element.classList.contains(visitedClass)) {
        element.classList.toggle('inputInvalid', isInvalid)
    }
}

function mainWrapperElementClickHandler(event: any) {
    event.stopPropagation();

    const {target} = event;
    const {classList} = target;
    const isAdd = classList.contains('addTask');

    const taskElement = target.closest('.task');

    const isEdit = taskElement?.classList.contains('editTask');
    const columnElement = target.closest('.column');

    cleanForm();

    const columnField = document.querySelector<HTMLInputElement>('#columnField');
    const columnName = columnElement.dataset.columnname;
    columnField.textContent = columnName;

    if (isAdd) {
        addNewTaskForm.dataset.mode = addMode;
        btnAddUpdateTask.textContent = 'Add';
    }

    if (isEdit) {
        addNewTaskForm.dataset.mode = editMode;
        addNewTaskForm.dataset.taskid = taskElement.dataset.taskid;

        const selectedTask = tasks[columnName].find(t => t.id === Number(taskElement.dataset.taskid));
        titleElement.value = selectedTask.title;
        descriptionElement.value = selectedTask.description;
        executorElement.value = String(selectedTask.executor.id);

        btnAddUpdateTask.textContent = 'Save';
    }
}

function cleanForm() {
    titleElement.value = '';
    descriptionElement.value = '';
    executorElement.value = '';

    titleElement.classList.toggle(visitedClass, false);
    descriptionElement.classList.toggle(visitedClass, false);
    executorElement.classList.toggle(visitedClass, false);

    setInvalid(titleElement, false);
    setInvalid(descriptionElement, false);

    invalidFormMessage.style.visibility = 'hidden';
}

function renderItemList(): void {
    mainWrapperElement.innerHTML =
        Object
            .keys(tasks)
            .map(columnName => createTaskColumnElementHtml(columnName))
            .join('');
}

function initApplication() {
    fillMockData();
    renderItemList();
    fillExecutorList();
}

initApplication();
