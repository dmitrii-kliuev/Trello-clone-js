import '../index.html';
import '../scss/main.scss';
import {addTask, createTaskColumnElementHtml, getTaskById, Task, tasks} from "./task";
import {fillMockData} from "./mockData";
import {fillExecutorList, getExecutorById} from "./executor";
import {addDragAndDrop} from "../js/main";
import {saveTasksToStorage} from "./storage";

const visitedClass = 'visited';
const addMode = 'addMode';
const editMode = 'editMode';

const mainWrapperElement = document.querySelector('.mainWrapper');
const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const btnRemove = document.querySelector('.modalFooter__btnRemove') as HTMLLabelElement;
const btnAddUpdateTask = document.querySelector('.btnAddUpdateTask') as HTMLLabelElement;
const formContent = document.querySelector('.content');

const invalidFormMessage = document.querySelector('.invalidFormMessage') as HTMLDivElement;

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

    btnRemove.addEventListener('click', removeTaskEventHandler)
});

function addNewTaskEventHandler(event: any) {
    const executorId = (document.querySelector('.executor') as HTMLOptionElement).value;

    const formData = new FormData(taskForm);
    const columnName = taskForm.dataset.columnName;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const executor = getExecutorById(Number(executorId))

    if (!checkInput()) {
        event.stopPropagation();
        event.preventDefault();
        return;
    }

    if (taskForm.dataset.mode === addMode) {
        addTask(columnName,
            new Task({
                title: title,
                description: description,
                executor: executor
            }));

        taskForm.dataset.mode = '';
    }

    if (taskForm.dataset.mode === editMode) {
        const editedTask = getTaskById(columnName, Number(taskForm.dataset.taskid))
        editedTask.title = title;
        editedTask.description = description;
        editedTask.executor = executor;
    }

    refresh();
}

export function checkInput() {
    const executorId = executorElement.value;

    const formData = new FormData(taskForm);
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

function mainWrapperElementClickHandler(event: any) {
    event.stopPropagation();

    const {target} = event;
    const {classList} = target;
    const isAdd = classList.contains('addTask');

    const taskElement = target.closest('.task');

    const isEdit = taskElement?.classList.contains('editTask');
    const columnElement = target.closest('.column');

    cleanForm();

    const columnName = columnElement?.dataset.columnname;
    taskForm.dataset.columnName = columnName;

    if (isAdd) {
        taskForm.dataset.mode = addMode;
        delete taskForm.dataset.taskid;
        btnRemove.style.display = 'none';
        btnAddUpdateTask.textContent = 'Add';
    }

    if (isEdit) {
        taskForm.dataset.mode = editMode;
        taskForm.dataset.taskid = taskElement.dataset.taskid;

        const selectedTask = tasks[columnName].find(t => t.id === Number(taskElement.dataset.taskid));
        titleElement.value = selectedTask.title;
        descriptionElement.value = selectedTask.description;
        executorElement.value = String(selectedTask.executor.id);

        btnRemove.style.display = 'block';
        btnAddUpdateTask.textContent = 'Save';
    }
}

function removeTaskEventHandler() {
    const columnName = taskForm.dataset.columnName;
    console.log(columnName, taskForm.dataset.taskid);

    const taskIndex = tasks[columnName].findIndex(c => c.id === Number(taskForm.dataset.taskid));
    console.log(taskIndex);
    tasks[columnName].splice(taskIndex, 1);

    if (window.confirm('Sure?')) {
        refresh();
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

export function renderItemList(): void {
    mainWrapperElement.innerHTML =
        Object
            .keys(tasks)
            .map(columnName => createTaskColumnElementHtml(columnName))
            .join('');
}

export function refresh(): void {
    renderItemList();
    addDragAndDrop();
    saveTasksToStorage();
}

function setInvalid(element: any, isInvalid: boolean) {
    if (element.classList.contains(visitedClass)) {
        element.classList.toggle('inputInvalid', isInvalid)
    }
}

function initApplication() {
    fillMockData();
    refresh();
    fillExecutorList();
}

initApplication();
